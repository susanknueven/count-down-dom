import { fetchGet } from './apiUtils.js';

export const getGameState = () =>
  fetchGet('http://localhost:3000/api/gameState', 'getGameState');