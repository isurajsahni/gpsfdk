const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function getToken() {
  return localStorage.getItem('token');
}

async function request(endpoint, options = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, { ...options, headers });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const err = new Error(data.message || 'Request failed');
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

// Auth
export const authApi = {
  register: (body) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  getMe: () => request('/auth/me'),
  forgotPassword: (body) => request('/auth/forgot-password', { method: 'POST', body: JSON.stringify(body) }),
  resetPassword: (body) => request('/auth/reset-password', { method: 'PUT', body: JSON.stringify(body) }),
};

// User
export const userApi = {
  updateProfile: (body) => request('/users/profile', { method: 'PUT', body: JSON.stringify(body) }),
  getAddresses: () => request('/users/addresses'),
  addAddress: (body) => request('/users/addresses', { method: 'POST', body: JSON.stringify(body) }),
  updateAddress: (id, body) => request(`/users/addresses/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteAddress: (id) => request(`/users/addresses/${id}`, { method: 'DELETE' }),
  getMyOrders: () => request('/users/orders'),
  getOrderById: (id) => request(`/users/orders/${id}`),
};

// Products (public)
export const productApi = {
  getProducts: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request(`/products${q ? `?${q}` : ''}`);
  },
  getProduct: (slugOrId) => request(`/products/${slugOrId}`),
};

// Products (admin)
export const productAdminApi = {
  getById: (id) => request(`/products/admin/one/${id}`),
  getAll: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request(`/products/admin/all${q ? `?${q}` : ''}`);
  },
  create: (body) => request('/products', { method: 'POST', body: JSON.stringify(body) }),
  update: (id, body) => request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (id) => request(`/products/${id}`, { method: 'DELETE' }),
  uploadImages: (id, formData) => {
    const token = getToken();
    return fetch(`${BASE_URL}/products/${id}/images`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    }).then((res) => res.json()).then((data) => {
      if (!data.success) throw new Error(data.message || 'Upload failed');
      return data;
    });
  },
};

// Orders
export const orderApi = {
  create: (body) => request('/orders', { method: 'POST', body: JSON.stringify(body) }),
  getOrder: (id) => request(`/orders/${id}`),
};

// Orders (admin)
export const orderAdminApi = {
  getList: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request(`/orders/admin/list${q ? `?${q}` : ''}`);
  },
  updateStatus: (id, status) => request(`/orders/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
};

// Payment
export const paymentApi = {
  createOrder: (body) => request('/payment/create-order', { method: 'POST', body: JSON.stringify(body) }),
  verify: (body) => request('/payment/verify', { method: 'POST', body: JSON.stringify(body) }),
};

// Coupons
export const couponApi = {
  validate: (body) => request('/coupons/validate', { method: 'POST', body: JSON.stringify(body) }),
};

// Shipping
export const shippingApi = {
  track: (orderId) => request(`/shipping/track/${orderId}`),
};
export const shippingAdminApi = {
  create: (body) => request('/shipping/create', { method: 'POST', body: JSON.stringify(body) }),
};
