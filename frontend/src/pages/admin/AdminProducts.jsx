import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAdminApi } from '../../services/api';
import { sortProductImages } from '../../utils/sortProductImages';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const load = () => {
    setLoading(true);
    productAdminApi.getAll({ page, limit: 20 }).then((r) => {
      setProducts(r.products || []);
      setTotal(r.total || 0);
    }).catch(() => setProducts([])).finally(() => setLoading(false));
  };

  useEffect(load, [page]);

  const handleDelete = (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    productAdminApi.delete(id).then(load).catch((e) => alert(e.message));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl text-gpsfdk-gold font-semibold">Products</h1>
        <Link
          to="/admin/products/new"
          className="bg-gpsfdk-orange hover:bg-gpsfdk-green text-white font-semibold py-2 px-4 rounded-lg"
        >
          Add Product
        </Link>
      </div>
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-400">No products. Add one to get started.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gpsfdk-gold/20 text-gray-400 text-sm">
                <th className="py-2">Image</th>
                <th className="py-2">Name</th>
                <th className="py-2">Category</th>
                <th className="py-2">Visible</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {products.map((p) => {
                const images = sortProductImages(p.images || []);
                return (
                  <tr key={p._id} className="border-b border-white/5">
                    <td className="py-2">
                      <img src={images[0] || ''} alt="" className="w-12 h-12 object-cover rounded" />
                    </td>
                    <td className="py-2">{p.name}</td>
                    <td className="py-2">{p.category}</td>
                    <td className="py-2">{p.isVisible ? 'Yes' : 'No'}</td>
                    <td className="py-2 flex gap-2">
                      <Link to={`/admin/products/edit/${p._id}`} className="text-gpsfdk-orange hover:underline text-sm">
                        Edit
                      </Link>
                      <button type="button" onClick={() => handleDelete(p._id, p.name)} className="text-red-400 hover:underline text-sm">
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {total > 20 && (
        <div className="flex gap-2 mt-4">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 rounded bg-gpsfdk-gold/30 text-white disabled:opacity-50"
          >
            Previous
          </button>
          <span className="py-2 text-gray-400">Page {page}</span>
          <button
            disabled={page * 20 >= total}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 rounded bg-gpsfdk-gold/30 text-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
