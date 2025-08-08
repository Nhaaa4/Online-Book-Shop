import axios from 'axios';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

// Request interceptor to add auth token from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('bookshop_user');
    if (token) {
      config.headers.token = token; // Frontend uses 'token' header instead of 'Authorization'
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('API Error:', error.response?.status, error.response?.data);
    
    if (error.response?.status === 401) {
      // Clear token and redirect to login on 401
      localStorage.removeItem('bookshop_user');
      window.location.href = '/login';
    }
    
    // Show error message
    const message = error.response?.data?.message || 'An error occurred';
    toast.error(message);
    
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/api/users/login', credentials),
  register: (userData) => api.post('/api/users/register', userData),
  getProfile: () => api.get('/api/users/profile'),
};

// Books API
export const booksAPI = {
  getAll: () => api.get('/api/books'),
  getById: (id) => api.get(`/api/books/${id}`),
  getCategories: () => api.get('/api/books/categories'),
};

// Reviews API
export const reviewsAPI = {
  getByBookId: (bookId) => api.get(`/api/reviews/${bookId}`),
  getMyReviews: () => api.get('/api/reviews/my-reviews'),
  create: (reviewData) => api.post('/api/reviews', reviewData),
};

// Orders API
export const ordersAPI = {
  placeOrder: (orderData) => api.post('/api/orders/place-order', orderData),
  placeOrderStripe: (orderData) => api.post('/api/orders/place-order-stripe', orderData),
  verifyPayment: (orderId, success) => api.post(`/api/orders/verify-payment?orderId=${orderId}&success=${success}`, {}),
  getHistory: () => api.get('/api/orders/history'),
};

// Address API
export const addressAPI = {
  getProvinces: () => api.get('/api/address/provinces'),
  getDistricts: (provinceId) => api.get(`/api/address/districts?province_id=${provinceId}`),
  getCommunes: (districtId) => api.get(`/api/address/communes?district_id=${districtId}`),
  getVillages: (communeId) => api.get(`/api/address/villages?commune_id=${communeId}`),
  getUserAddress: () => api.get('/api/address/user'),
};
