import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' }
});

// Request interceptor - add JWT token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('agroconnect_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors globally
API.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('agroconnect_token');
      localStorage.removeItem('agroconnect_user');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || { message: 'Network error' });
  }
);

// Auth APIs
export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  verifyOtp: (data) => API.post('/auth/verify-otp', data),
  forgotPassword: (data) => API.post('/auth/forgot-password', data),
  resetPassword: (data) => API.post('/auth/reset-password', data),
  getMe: () => API.get('/auth/me'),
  updateProfile: (data) => API.put('/auth/profile', data),
  changePassword: (data) => API.put('/auth/change-password', data),
};

// Farmer APIs
export const farmerAPI = {
  getCrops: () => API.get('/farmer/crops'),
  getCrop: (id) => API.get(`/farmer/crops/${id}`),
  addCrop: (data) => API.post('/farmer/crops', data),
  updateCrop: (id, data) => API.put(`/farmer/crops/${id}`, data),
  deleteCrop: (id) => API.delete(`/farmer/crops/${id}`),
  addWaterUsage: (id, data) => API.post(`/farmer/crops/${id}/water`, data),
  addFertilizer: (id, data) => API.post(`/farmer/crops/${id}/fertilizer`, data),
  getStats: () => API.get('/farmer/stats'),
};

// Marketplace APIs
export const marketAPI = {
  getProducts: (params) => API.get('/marketplace/products', { params }),
  getFeatured: () => API.get('/marketplace/products/featured'),
  getProduct: (id) => API.get(`/marketplace/products/${id}`),
  addProduct: (data) => API.post('/marketplace/products', data),
  updateProduct: (id, data) => API.put(`/marketplace/products/${id}`, data),
  deleteProduct: (id) => API.delete(`/marketplace/products/${id}`),
  addReview: (id, data) => API.post(`/marketplace/products/${id}/review`, data),
  getCategories: () => API.get('/marketplace/categories'),
  getFarmerProducts: () => API.get('/marketplace/farmer-products'),
};

// Order APIs
export const orderAPI = {
  getCart: () => API.get('/orders/cart'),
  addToCart: (data) => API.post('/orders/cart/add', data),
  updateCart: (data) => API.put('/orders/cart/update', data),
  removeFromCart: (productId) => API.delete(`/orders/cart/remove/${productId}`),
  checkout: (data) => API.post('/orders/checkout', data),
  getOrders: () => API.get('/orders'),
  getOrder: (id) => API.get(`/orders/${id}`),
  cancelOrder: (id, data) => API.put(`/orders/${id}/cancel`, data),
};

// Weather APIs
export const weatherAPI = {
  getWeather: (city) => API.get('/weather', { params: { city } }),
  getCities: () => API.get('/weather/cities'),
};

// Disease Detection APIs
export const diseaseAPI = {
  detectDisease: (data) => API.post('/disease/detect', data),
  recommendCrop: (data) => API.post('/disease/recommend-crop', data),
};

// Analytics APIs
export const analyticsAPI = {
  getSales: () => API.get('/analytics/sales'),
  getMarketPrices: () => API.get('/analytics/market-prices'),
  getProfit: () => API.get('/analytics/profit'),
};

// Admin APIs
export const adminAPI = {
  getStats: () => API.get('/admin/stats'),
  getUsers: (params) => API.get('/admin/users', { params }),
  updateUser: (id, data) => API.put(`/admin/users/${id}`, data),
  deleteUser: (id) => API.delete(`/admin/users/${id}`),
  getOrders: (params) => API.get('/admin/orders', { params }),
  updateOrderStatus: (id, data) => API.put(`/admin/orders/${id}/status`, data),
  getProducts: () => API.get('/admin/products'),
  featureProduct: (id, data) => API.put(`/admin/products/${id}/feature`, data),
};

// Schemes, Blog, Equipment, Chatbot, Feedback, Notifications
export const schemeAPI = { getSchemes: () => API.get('/schemes') };
export const blogAPI = { getBlogs: () => API.get('/blog'), getBlog: (slug) => API.get(`/blog/${slug}`) };
export const equipmentAPI = { getEquipment: () => API.get('/equipment') };
export const chatbotAPI = { sendMessage: (data) => API.post('/chatbot/message', data) };
export const feedbackAPI = { submitFeedback: (data) => API.post('/feedback', data) };
export const notificationAPI = {
  getNotifications: () => API.get('/notifications'),
  markRead: (id) => API.put(`/notifications/${id}/read`),
  markAllRead: () => API.put('/notifications/read-all'),
};

export default API;
