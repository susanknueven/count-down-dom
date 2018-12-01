import { fetchPost, fetchPut, fetchGet } from './apiUtils.js';

export const writeScores = scores =>
  fetchPost('http://localhost:3000/api/scores', scores, 'writeScores');

export const updateTeamScore = score =>
  fetchPut('http://localhost:3000/api/scores', score, 'updateTeamScore');

export const initializeEmptyScores = () =>
  fetchGet('http://localhost:3000/api/initializeEmptyScores', 'initializeEmptyScores');