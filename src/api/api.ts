import axios from 'axios';

export const baseURL = 'http://localhost:3000/';
export const currencyBaseURL = 'https://openexchangerates.org/api/';

export const API_ROUTES = {
  squares: 'squares',
  notes: 'notes',
  operations: 'operations',
  admin: 'admin',
  currencyDollar: `latest.json?app_id=${import.meta.env.VITE_API_KEY}&base=USD&symbols=UAH`,
};

export function client() {
  return axios.create({
    timeout: 10000,
  });
}
