import { resetGameState, gameStateSetter } from './serverGameState.js';
import { getNextTrivia } from './serverQuestions.js';
import { trivia } from './serverTrivia.js';
import {GENERAL_TRIVIA} from '../ui/utils/stateConstants';

describe('server trivia question', () => {
  beforeEach(() => {
    resetGameState();
    trivia.reset();
  });
  test('returns trivia for general trivia when no group specified', () => { 
    trivia.load(GENERAL_TRIVIA, './mockTrivia.json');
    const ctx = {
      request: { body: JSON.stringify({}) },
      response: {}
    };
    
    const { response } = getNextTrivia(ctx);
    expect(response.body.trivia).toBeDefined();
  });
  test('returns trivia for group when specified', () => { 
    trivia.load('myTrivia', './mockTrivia.json');
    const ctx = {
      request: { body: JSON.stringify({ group: 'myTrivia' }) },
      response: {}
    };

    const { response } = getNextTrivia(ctx);
    expect(response.body.trivia).toBeDefined();
  });
  test('returns nothing when no trivia for group name exists', () => { 
    trivia.load(GENERAL_TRIVIA, './mockTrivia.json');
    const ctx = {
      request: { body: JSON.stringify({ group: 'myTrivia' }) },
      response: {}
    };

    const { response } = getNextTrivia(ctx);
    expect(response.body.trivia).not.toBeDefined();
  });
});
