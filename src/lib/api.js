import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      Cookies.remove('access_token');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  adminLogin: (credentials) => api.post('/auth/admin/login', credentials),
  getProfile: () => api.get('/auth/me'),
  verifyToken: () => api.get('/auth/verify-token'),
};

// Admin API calls
export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),
  verifyAdmin: () => api.get('/admin/verify'),
  getProductStats: () => api.get('/admin/products/stats'),
  getUserStats: () => api.get('/admin/users/stats'),
  getAnalytics: () => api.get('/admin/analytics/summary'),
  getOrders: (params = {}) => api.get('/orders', { params }),
  updateOrderStatus: (orderId, status) => api.post(`/orders/${orderId}/update-status`, { new_status: status }),
  updateOrder: (orderId, data) => api.put(`/orders/${orderId}`, data),
  getContactMessages: (params = {}) => api.get('/contact/messages', { params }),
  markMessageAsRead: (messageId) => api.post(`/contact/messages/${messageId}/mark-read`),
  markAllMessagesAsRead: () => api.post('/contact/messages/mark-all-read'),
  updateContactMessage: (messageId, data) => api.put(`/contact/messages/${messageId}`, data),
  deleteContactMessage: (messageId) => api.delete(`/contact/messages/${messageId}`),
  getUsers: (params = {}) => api.get('/admin/users', { params }),
};

// Products API calls
export const productsAPI = {
  getAllProducts: (params = {}) => api.get('/products', { params }),
  getProduct: (id) => api.get(`/products/${id}`),
  createProduct: (productData) => api.post('/products', productData),
  updateProduct: (id, productData) => api.put(`/products/${id}`, productData),
  deleteProduct: (id) => api.delete(`/products/${id}`),
  getCategories: () => api.get('/products/categories/list'),
};

export default api;