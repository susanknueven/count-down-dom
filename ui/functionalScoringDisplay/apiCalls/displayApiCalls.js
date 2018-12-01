import { fetchGet } from './apiUtils.js';

export const displayCategory = () =>
  fetchGet('http://localhost:3000/api/displayCategory', 'displayCategory');

export const displayQuestion = () =>
  fetchGet('http://localhost:3000/api/displayQuestion', 'displayQuestion');

export const displayAnswer = () =>
  fetchGet('http://localhost:3000/api/displayAnswer', 'displayAnswer');