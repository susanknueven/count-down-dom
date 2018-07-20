import {
  gameStateGetter,
  gameStateSetter,
  resetGameState
} from './serverGameState';
import {
  SHOW_CATEGORY,
  REGISTER,
  WELCOME,
  TRIVIA
} from '../ui/utils/stateConstants.js';

describe('server game state', () => {
  beforeEach(() => {
    resetGameState();
  });
  test('resets game state', () => {
    const gameState = {
      gameOperatorView: SHOW_CATEGORY,
      playerView: TRIVIA,
      scores: [[0, 1], [1, 1]],
      teamNames: ['hi', 'bye'],
      totals: [1, 2]
    };
    gameStateSetter(gameState);
    expect(gameStateGetter()).toEqual(gameState);

    resetGameState();

    expect(gameStateGetter()).toEqual({
      gameOperatorView: REGISTER,
      playerView: WELCOME,
      scores: [],
      teamNames: [],
      totals: []
    });
  });
  describe('game state setter', () => {
    test('changes teamNames and returns game state', () => {
      const teamNames = ['jack', 'jill'];
      gameStateSetter({ teamNames });

      const originalState = gameStateGetter();
      expect(originalState.scores).toEqual([]);
      expect(originalState.totals).toEqual([]);
      expect(originalState.teamNames).toEqual(teamNames);
      const newTeamNames = ['pail', 'water'];

      const gameState = gameStateSetter({ teamNames: newTeamNames });
      expect(gameState.scores).toEqual([]);
      expect(gameState.teamNames).toBe(newTeamNames);
      expect(gameState.totals).toEqual([]);
    });
    test('changes scores and returns new game state with new scores and totals updated', () => {
      const teamNames = ['jack', 'jill'];
      gameStateSetter({ teamNames });
      const scores = [[0, 1]];
      const originalState = gameStateGetter();

      expect(originalState.scores).toEqual([]);
      expect(originalState.totals).toEqual([]);
      expect(originalState.teamNames).toEqual(teamNames);

      const gameState = gameStateSetter({ scores });

      expect(gameState.scores).toBe(scores);
      expect(gameState.teamNames).toBe(teamNames);
      expect(gameState.totals).toEqual([0, 1]);
    });
    test('changes game operator view', () => {
      const gameOperatorView = REGISTER;
      gameStateSetter({ gameOperatorView });
      const originalState = gameStateGetter();

      expect(originalState.gameOperatorView).toEqual(REGISTER);

      const gameState = gameStateSetter({ gameOperatorView: SHOW_CATEGORY });

      expect(gameState.gameOperatorView).toEqual(SHOW_CATEGORY);
    });
    test('changes player view', () => {
      const playerView = WELCOME;
      gameStateSetter({ playerView });
      const originalState = gameStateGetter();

      expect(originalState.playerView).toEqual(WELCOME);

      const gameState = gameStateSetter({ playerView: TRIVIA });

      expect(gameState.playerView).toEqual(TRIVIA);
    });
    test('ignores extraneous properties', () => {
      const teamNames = ['jack', 'jill'];
      const scores = [[0, 1]];
      const otherProp = ['georgie', 'porgy'];
      gameStateSetter({ teamNames, scores, otherProp });
      const originalState = gameStateGetter();

      expect(originalState.scores).toEqual(scores);
      expect(originalState.totals).toEqual([0, 1]);
      expect(originalState.teamNames).toEqual(teamNames);
      expect(originalState.otherProp).toBeUndefined();
    });
  });
});
