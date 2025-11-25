import axios from 'axios';

const API_KEY = '9ef7ed9e74724c8aabb9e235ba2d0b4a';

export const baseURL = 'http://localhost:3000/';
export const currencyBaseURL = 'https://openexchangerates.org/api/';

export const API_ROUTES = {
  squares: 'squares',
  notes: 'notes',
  operations: 'operations',
  currencyDollar: `latest.json?app_id=${API_KEY}&base=USD&symbols=UAH`,
};

export function client() {
  return axios.create({
    timeout: 10000,
  });
}
