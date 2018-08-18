import { gameStateSetter } from './serverGameState.js';
import {
  SHOW_CATEGORY,
  SHOW_QUESTION,
  SHOW_ANSWER
} from '../ui/utils/stateConstants.js';
import {
  displayCategory,
  displayQuestion,
  displayAnswer
} from './serverDisplay.js';
import { resetGameState } from './serverGameState.js';

describe('server display', () => {
  beforeEach(() => {
    resetGameState();
  });
  test('sets gameOperatorView to SHOW_CATEGORY', () => {
    const ctx = { response: {} };

    const { response } = displayCategory(ctx);

    expect(response.body.gameOperatorView).toEqual(SHOW_CATEGORY);
  });
  test('sets gameOperatorView to SHOW_QUESTION', () => {
    const ctx = { response: {} };

    const { response } = displayQuestion(ctx);

    expect(response.body.gameOperatorView).toEqual(SHOW_QUESTION);
  });
  test('sets gameOperatorView to SHOW_ANSWER', () => {
    const ctx = { response: {} };

    const { response } = displayAnswer(ctx);

    expect(response.body.gameOperatorView).toEqual(SHOW_ANSWER);
  });
});
