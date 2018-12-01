import { fetchPost } from './apiUtils.js';

export const getNextTrivia = group =>
  fetchPost('http://localhost:3000/api/getNextTrivia', { group }, 'getNextTrivia');