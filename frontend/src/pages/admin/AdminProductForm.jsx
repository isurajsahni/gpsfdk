import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productAdminApi } from '../../services/api';

const defaultVariation = { material: '', frame: '', size: '', price: 0, stock: 0 };

export default function AdminProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: 'wall-canvas',
    images: [],
    variations: [{ ...defaultVariation }],
    isVisible: true,
    featured: false,
  });

  useEffect(() => {
    if (isEdit && id) {
      productAdminApi.getById(id).then((r) => {
        const p = r.product;
        if (p) {
          setForm({
            name: p.name || '',
            description: p.description || '',
            category: p.category || 'wall-canvas',
            images: p.images || [],
            variations: (p.variations && p.variations.length) ? p.variations : [{ ...defaultVariation }],
            isVisible: p.isVisible !== false,
            featured: !!p.featured,
          });
        }
      }).catch(() => {});
    }
  }, [isEdit, id]);

  const addVariation = () => {
    setForm((f) => ({ ...f, variations: [...f.variations, { ...defaultVariation }] }));
  };

  const updateVariation = (index, field, value) => {
    setForm((f) => {
      const v = [...f.variations];
      v[index] = { ...v[index], [field]: value };
      return { ...f, variations: v };
    });
  };

  const removeVariation = (index) => {
    if (form.variations.length <= 1) return;
    setForm((f) => ({ ...f, variations: f.variations.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      ...form,
      variations: form.variations.filter((v) => v.material && v.frame && v.size && v.price >= 0),
    };
    try {
      if (isEdit) {
        await productAdminApi.update(id, payload);
        navigate('/admin/products');
      } else {
        await productAdminApi.create(payload);
        navigate('/admin/products');
      }
    } catch (err) {
      alert(err.message || 'Failed to save');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl text-gpsfdk-gold font-semibold mb-6">{isEdit ? 'Edit Product' : 'Add Product'}</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
        <div>
          <label className="block text-gray-400 text-sm mb-1">Name *</label>
          <input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="w-full bg-white/10 border border-gpsfdk-gold/30 rounded px-4 py-2 text-white"
            required
          />
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-1">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            className="w-full bg-white/10 border border-gpsfdk-gold/30 rounded px-4 py-2 text-white"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-1">Category *</label>
          <select
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            className="w-full bg-white/10 border border-gpsfdk-gold/30 rounded px-4 py-2 text-white"
          >
            <option value="wall-canvas">Wall Canvas</option>
            <option value="house-nameplates">House Nameplates</option>
            <option value="watch-buy">Watch & Buy</option>
          </select>
        </div>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-gray-400">
            <input
              type="checkbox"
              checked={form.isVisible}
              onChange={(e) => setForm((f) => ({ ...f, isVisible: e.target.checked }))}
            />
            Visible
          </label>
          <label className="flex items-center gap-2 text-gray-400">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
            />
            Featured
          </label>
        </div>
        <div>
          <p className="text-gray-400 text-sm mb-2">Variations (material, frame, size, price, stock)</p>
          {form.variations.map((v, i) => (
            <div key={i} className="flex flex-wrap gap-2 mb-2 items-center">
              <input
                placeholder="Material"
                value={v.material}
                onChange={(e) => updateVariation(i, 'material', e.target.value)}
                className="w-24 bg-white/10 border rounded px-2 py-1 text-white text-sm"
              />
              <input
                placeholder="Frame"
                value={v.frame}
                onChange={(e) => updateVariation(i, 'frame', e.target.value)}
                className="w-24 bg-white/10 border rounded px-2 py-1 text-white text-sm"
              />
              <input
                placeholder="Size"
                value={v.size}
                onChange={(e) => updateVariation(i, 'size', e.target.value)}
                className="w-24 bg-white/10 border rounded px-2 py-1 text-white text-sm"
              />
              <input
                type="number"
                placeholder="Price"
                value={v.price || ''}
                onChange={(e) => updateVariation(i, 'price', Number(e.target.value))}
                className="w-20 bg-white/10 border rounded px-2 py-1 text-white text-sm"
              />
              <input
                type="number"
                placeholder="Stock"
                value={v.stock || ''}
                onChange={(e) => updateVariation(i, 'stock', Number(e.target.value))}
                className="w-16 bg-white/10 border rounded px-2 py-1 text-white text-sm"
              />
              <button type="button" onClick={() => removeVariation(i)} className="text-red-400 text-sm">
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addVariation} className="text-gpsfdk-orange text-sm hover:underline">
            + Add variation
          </button>
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-gpsfdk-orange hover:bg-gpsfdk-green text-white font-semibold py-2 px-6 rounded disabled:opacity-50"
          >
            {loading ? 'Saving...' : isEdit ? 'Update' : 'Create'}
          </button>
          <button type="button" onClick={() => navigate('/admin/products')} className="text-gray-400 hover:text-white">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
