import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  Product,
  Order,
  clearAuthSession,
  createProduct,
  deleteProduct,
  getOrders,
  getStoredUser,
  getProducts,
  updateProduct,
  updateOrderStatus,
} from '../frontend/src/app/lib/api';
import { useNavigate } from 'react-router';
import { formatPKR, getDiscountedPrice, hasDiscount } from '../frontend/src/app/lib/pricing';

const defaultProduct = {
  name: '',
  price: 0,
  image: '',
  scent: '',
  category: '',
  isNew: false,
};

export const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [adminEmail, setAdminEmail] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [form, setForm] = useState(defaultProduct);
  const [discountInputs, setDiscountInputs] = useState<Record<string, string>>({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    const user = getStoredUser();
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    setAdminEmail(user.email);

    const loadData = async () => {
      try {
        const [productList, orderList] = await Promise.all([getProducts(), getOrders()]);
        setProducts(productList);
        setDiscountInputs(
          productList.reduce<Record<string, string>>((acc, product) => {
            acc[product.id] = String(product.discountPercent || 0);
            return acc;
          }, {}),
        );
        setOrders(orderList);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Failed to load admin data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [navigate]);

  const handleAddProduct = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    if (!form.image) {
      setError('Please select a product image');
      return;
    }
    try {
      const created = await createProduct(form);
      setProducts((prev) => [created, ...prev]);
      setDiscountInputs((prev) => ({ ...prev, [created.id]: String(created.discountPercent || 0) }));
      setForm(defaultProduct);
      setImagePreview('');
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to create product');
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || '');
      setForm((prev) => ({ ...prev, image: result }));
      setImagePreview(result);
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((item) => item.id !== id));
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to delete product');
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const updated = await updateOrderStatus(id, status);
      setOrders((prev) => prev.map((order) => (order.id === id ? updated : order)));
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to update order');
    }
  };

  const handleApplyDiscount = async (id: string) => {
    const value = Number(discountInputs[id] || 0);
    const safeValue = Math.min(90, Math.max(0, value));
    try {
      const updated = await updateProduct(id, { discountPercent: safeValue });
      setProducts((prev) => prev.map((product) => (product.id === id ? updated : product)));
      setDiscountInputs((prev) => ({ ...prev, [id]: String(updated.discountPercent || 0) }));
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to apply discount');
    }
  };

  return (
    <section className="pt-32 pb-24 bg-[#0B0B0B] min-h-screen">
      <div className="container mx-auto px-6 space-y-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-primary text-xs uppercase tracking-[0.5em] mb-2 font-bold">Control Panel</p>
            <h1 className="text-4xl font-serif text-white">Admin Dashboard</h1>
            <p className="text-white/45 text-xs uppercase tracking-[0.25em] mt-2">Admin: {adminEmail}</p>
          </div>
          <button
            onClick={() => {
              clearAuthSession();
              navigate('/login');
            }}
            className="border border-white/20 text-white px-6 py-3 uppercase tracking-[0.2em] text-xs hover:border-primary hover:text-primary"
          >
            Logout
          </button>
        </div>

        {error && <p className="text-destructive text-sm">{error}</p>}
        {loading && <p className="text-white/40 uppercase tracking-widest text-xs">Loading dashboard...</p>}

        {!loading && (
          <>
            <motion.form
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleAddProduct}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 bg-zinc-950 border border-white/10 p-6"
            >
              <input
                className="bg-black border border-white/15 px-4 py-3 text-white"
                placeholder="Product name"
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                required
              />
              <input
                className="bg-black border border-white/15 px-4 py-3 text-white"
                placeholder="Category"
                value={form.category}
                onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
                required
              />
              <input
                className="bg-black border border-white/15 px-4 py-3 text-white"
                placeholder="Price"
                type="number"
                value={form.price}
                onChange={(event) => setForm((prev) => ({ ...prev, price: Number(event.target.value) }))}
                required
              />
              <input
                className="bg-black border border-white/15 px-4 py-3 text-white"
                placeholder="Scent"
                value={form.scent}
                onChange={(event) => setForm((prev) => ({ ...prev, scent: event.target.value }))}
                required
              />
              <div className="flex items-center gap-3 bg-black border border-white/15 px-4 py-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full text-xs text-white file:mr-3 file:px-3 file:py-1.5 file:border file:border-white/20 file:bg-zinc-900 file:text-white file:text-[10px] file:uppercase file:tracking-[0.15em]"
                  required
                />
                {imagePreview && <img src={imagePreview} alt="Preview" className="w-10 h-10 object-cover border border-white/20" />}
              </div>
              <button type="submit" className="bg-primary text-black px-5 py-3 uppercase tracking-[0.2em] text-xs font-bold">
                Add Product
              </button>
            </motion.form>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
              <div className="xl:col-span-7 bg-zinc-950 border border-white/10 p-6">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <h2 className="text-xl font-serif text-white">Products ({products.length})</h2>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">Inventory</span>
                </div>
                <div className="space-y-4 max-h-[460px] overflow-auto pr-1">
                  {products.map((item) => (
                    <div key={item.id} className="border border-white/10 p-4 space-y-4">
                      <div>
                        <p className="text-white font-medium">{item.name}</p>
                        <p className="text-white/40 text-xs uppercase tracking-widest">
                          {item.category}
                        </p>
                        <p className="text-xs mt-2 text-white/60">
                          Price: {formatPKR(item.price)}
                          {hasDiscount(item.discountPercent) ? (
                            <span className="ml-2 text-primary">
                              -&gt; {formatPKR(getDiscountedPrice(item.price, item.discountPercent))} ({item.discountPercent}% OFF)
                            </span>
                          ) : (
                            <span className="ml-2 text-white/35">No discount</span>
                          )}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] uppercase tracking-[0.2em] text-white/45">Discount</span>
                          <input
                            type="number"
                            min={0}
                            max={90}
                            value={discountInputs[item.id] ?? '0'}
                            onChange={(event) =>
                              setDiscountInputs((prev) => ({ ...prev, [item.id]: event.target.value }))
                            }
                            className="w-24 bg-black border border-white/15 px-3 py-2 text-white text-xs"
                          />
                          <button
                            onClick={() => handleApplyDiscount(item.id)}
                            className="border border-primary/40 text-primary px-3 py-2 text-[10px] uppercase tracking-[0.2em] hover:bg-primary hover:text-black"
                          >
                            Apply
                          </button>
                        </div>

                        <button
                          onClick={() => handleDeleteProduct(item.id)}
                          className="border border-destructive/40 text-destructive px-4 py-2 text-[10px] uppercase tracking-widest"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="xl:col-span-5 bg-zinc-950 border border-white/10 p-6">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <h2 className="text-xl font-serif text-white">Orders ({orders.length})</h2>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">Fulfillment</span>
                </div>
                <div className="space-y-4 max-h-[460px] overflow-auto pr-1">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-white/10 p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-white text-sm">{order.id.slice(0, 8)}...</p>
                        <p className="text-primary font-medium">{formatPKR(order.total)}</p>
                      </div>
                      <p className="text-white/40 text-xs uppercase tracking-widest">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                      <div className="flex gap-2">
                        {['pending', 'processing', 'completed'].map((status) => (
                          <button
                            key={status}
                            onClick={() => handleStatusChange(order.id, status)}
                            className={`px-3 py-2 text-[10px] uppercase tracking-widest border ${
                              order.status === status
                                ? 'border-primary text-primary'
                                : 'border-white/20 text-white/60 hover:text-white'
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
