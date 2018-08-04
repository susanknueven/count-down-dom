import { loadPage } from './loadPageAndEventListeners.js';
import { getGameState } from './gameStateApiCalls.js';
import { displayScoreControls } from './scoreTableSideEffects.js';
import { QUESTION_LOADED, REGISTER } from '../utils/stateConstants.js';

jest.mock('./gameStateApiCalls.js');
jest.mock('./scoreTableSideEffects.js');

const state = {
  gameOperatorView: QUESTION_LOADED,
  teamNames: ['hi', 'bye'],
  scores: [[0, 1], [1, 1]],
  totals: [1, 2]
};

describe('load page', () => {
  beforeEach(() => {
    getGameState.mockReset();
    displayScoreControls.mockReset();
  });
  test('calls generate score board with state when gameOpView is not REGISTER', async () => {
    const newStatePromise = Promise.resolve(state);
    getGameState.mockImplementationOnce(() => newStatePromise);
    const html = await loadPage();

    expect(getGameState.mock.calls.length).toEqual(1);
    expect(displayScoreControls.mock.calls.length).toEqual(1);
    expect(displayScoreControls.mock.calls[0][0]).toEqual(state);
  });
  test('does not call generate score board with state when gameOpView is REGISTER', async () => {
    const newStatePromise = Promise.resolve(
      Object.assign(state, { gameOperatorView: REGISTER })
    );
    getGameState.mockImplementationOnce(() => newStatePromise);
    const html = await loadPage();

    expect(getGameState.mock.calls.length).toEqual(1);
    expect(displayScoreControls.mock.calls.length).toEqual(0);
  });
});
