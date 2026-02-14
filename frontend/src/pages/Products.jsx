import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { productApi } from '../services/api';
import { sortProductImages } from '../utils/sortProductImages';

export default function Products() {
  const { category: categoryParam } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(categoryParam || '');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    setCategory(categoryParam || '');
  }, [categoryParam]);

  useEffect(() => {
    setLoading(true);
    const params = { page, limit: 12 };
    if (category) params.category = category;
    if (search) params.search = search;
    productApi
      .getProducts(params)
      .then((r) => {
        setProducts(r.products || []);
        setTotal(r.total || 0);
        setPages(r.pages || 1);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [page, category, search]);

  return (
    <section className="min-h-[80vh] bg-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-4xl text-gpsfdk-gold font-semibold mb-6">Products</h1>
        <div className="flex flex-wrap gap-4 mb-8">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="bg-white/10 border border-gpsfdk-gold/30 rounded-lg px-4 py-2 text-white w-48"
          />
          <select
            value={category}
            onChange={(e) => { setCategory(e.target.value); setPage(1); }}
            className="bg-white/10 border border-gpsfdk-gold/30 rounded-lg px-4 py-2 text-white"
          >
            <option value="">All categories</option>
            <option value="wall-canvas">Wall Canvas</option>
            <option value="house-nameplates">House Nameplates</option>
            <option value="watch-buy">Watch & Buy</option>
          </select>
        </div>

        {loading ? (
          <div className="text-gpsfdk-gold py-12">Loading...</div>
        ) : products.length === 0 ? (
          <p className="text-gray-400 py-12">No products found.</p>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((p) => {
                const images = sortProductImages(p.images || []);
                const firstImage = images[0];
                const minPrice = Math.min(...(p.variations || []).map((v) => v.price), Infinity);
                const displayPrice = minPrice === Infinity ? '—' : `₹${minPrice}`;
                return (
                  <Link
                    key={p._id}
                    to={`/product/${p.slug || p._id}`}
                    className="group block bg-white/5 border border-gpsfdk-gold/20 rounded-lg overflow-hidden hover:border-gpsfdk-orange/50 transition"
                  >
                    <div className="aspect-[2/3] overflow-hidden">
                      <img
                        src={firstImage || 'https://via.placeholder.com/400'}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-medium truncate">{p.name}</h3>
                      <p className="text-gpsfdk-green font-semibold">{displayPrice}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
            {pages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="px-4 py-2 rounded bg-gpsfdk-gold/30 text-white disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-gray-400">
                  {page} / {pages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(pages, p + 1))}
                  disabled={page >= pages}
                  className="px-4 py-2 rounded bg-gpsfdk-gold/30 text-white disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
