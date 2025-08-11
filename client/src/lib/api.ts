import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// External API configuration
const EXTERNAL_API_BASE = 'https://www.ehlcrm.theskyroute.com/api';

export const externalApi = axios.create({
  baseURL: EXTERNAL_API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API functions for subject areas
export const fetchSubjectAreas = async (page: number = 1) => {
  const response = await externalApi.get(`/test/popular-subject-area?page=${page}`);
  return response.data;
};

export const fetchSubjectAreaDetails = async (id: number) => {
  const response = await externalApi.get(`/subject-area-details?id=${id}`);
  return response.data;
};

// API functions for careers
export const fetchCareers = async (page: number = 1) => {
  const response = await externalApi.get(`/test/top-future-career?page=${page}`);
  return response.data;
};

export const fetchCareerDetails = async (id: number) => {
  const response = await externalApi.get(`/future-career-details?id=${id}`);
  return response.data;
};

// Contact form submission
export const submitContactForm = async (formData: any) => {
  const response = await api.post('/contact', formData);
  return response.data;
};

export default api;
