import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

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
    const token = localStorage.getItem('bookshop_admin');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
      localStorage.removeItem('bookshop_admin');
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

// Roles API
export const rolesAPI = {
  getAll: () => api.get('/api/roles'),
  getPermissions: () => api.get('/api/roles/permission'),
  create: (roleData) => api.post('/api/roles', roleData),
  update: (roleData) => api.post('/api/roles/update-role', roleData),
  delete: (roleId) => api.delete(`/api/roles/${roleId}`),
  // Permission management
  createPermission: (permissionData) => api.post('/api/roles/permission', permissionData),
  updatePermission: (permissionId, permissionData) => api.patch(`/api/roles/permission/${permissionId}`, permissionData),
  deletePermission: (permissionId) => api.delete(`/api/roles/permission/${permissionId}`),
};

// Users API
export const usersAPI = {
  getAll: () => api.get('/api/users'),
  getById: (id) => api.get(`/api/users/${id}`),
  create: (userData) => api.post('/api/users', userData),
  update: (id, userData) => api.patch(`/api/users/${id}`, userData),
  delete: (id) => api.delete(`/api/users/${id}`),
  getNumber: () => api.get('/api/users/number'),
  getCount: () => api.get('/api/users/number'),
};

// Books API
export const booksAPI = {
  getAll: () => api.get('/api/books'),
  getById: (id) => api.get(`/api/books/${id}`),
  getNumber: () => api.get('/api/books/number'),
  getCount: () => api.get('/api/books/number'),
  getAuthors: () => api.get('/api/books/authors'),
  getCategories: () => api.get('/api/books/categories'),
  create: (bookData) => {
    // Handle FormData for file uploads
    const config = bookData instanceof FormData ? 
      { headers: { 'Content-Type': 'multipart/form-data' } } : {};
    return api.post('/api/books', bookData, config);
  },
  update: (id, bookData) => {
    // Handle FormData for file uploads
    const config = bookData instanceof FormData ? 
      { headers: { 'Content-Type': 'multipart/form-data' } } : {};
    return api.patch(`/api/books/${id}`, bookData, config);
  },
  delete: (id) => api.delete(`/api/books/${id}`),
  // Image upload specific endpoints
  uploadImage: (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    return api.post('/api/books/upload-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  uploadImages: (imageFiles) => {
    const formData = new FormData();
    imageFiles.forEach(file => {
      formData.append('images', file);
    });
    return api.post('/api/books/upload-images', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  deleteImage: (imageUrl) => api.delete('/api/books/delete-image', { data: { image_url: imageUrl } }),
};

// Orders API
export const ordersAPI = {
  getAll: () => api.get('/api/orders'),
  getById: (id) => api.get(`/api/orders/${id}`),
  getNumber: () => api.get('/api/orders/number'),
  getCount: () => api.get('/api/orders/number'),
  updateStatus: (id, status) => api.patch(`/api/orders/${id}`, { status }),
  delete: (id) => api.delete(`/api/orders/${id}`),
};