import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

const api = axios.create({ baseURL });

export const tokenStore = {
  get access()  { return localStorage.getItem('access_token'); },
  get refresh() { return localStorage.getItem('refresh_token'); },
  save({ access, refresh }) {
    if (access)  localStorage.setItem('access_token', access);
    if (refresh) localStorage.setItem('refresh_token', refresh);
  },
  clear() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },
};

// Attach access token to every request
api.interceptors.request.use((config) => {
  const token = tokenStore.access;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// On 401, try to refresh once, then retry the original request
let refreshing = null;

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    const status = error.response?.status;

    if (status !== 401 || original._retry || !tokenStore.refresh) {
      return Promise.reject(error);
    }

    original._retry = true;
    try {
      refreshing = refreshing || axios.post(`${baseURL}/auth/refresh/`, {
        refresh: tokenStore.refresh,
      });
      const { data } = await refreshing;
      refreshing = null;
      tokenStore.save({ access: data.access });
      original.headers.Authorization = `Bearer ${data.access}`;
      return api(original);
    } catch (err) {
      refreshing = null;
      tokenStore.clear();
      window.location.href = '/login';
      return Promise.reject(err);
    }
  }
);

export default api;