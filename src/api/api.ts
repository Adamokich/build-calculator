import axios from 'axios';

export const API_ROUTES = {
  squares: 'squares',
  notes: 'notes',
};

export function client() {
  return axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 10000,
  });
}
