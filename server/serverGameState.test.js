import {
  gameStateGetter,
  gameStateSetter,
  resetGameState
} from './serverGameState';

describe('koa-server tests', () => {
  describe('game state', () => {
    beforeEach(() => {
      resetGameState();
    });
    test('resets game state', () => {
      const gameState = {
        scores: [[0, 1], [1, 1]],
        teamNames: ['hi', 'bye'],
        totals: [1, 2]
      };
      gameStateSetter(gameState);
      expect(gameStateGetter()).toEqual(gameState);

      resetGameState();

      expect(gameStateGetter()).toEqual({
        scores: [],
        teamNames: [],
        totals: []
      });
    });
    test('setter changes teamNames and returns game state', () => {
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
    test('setter changes scores and returns new game state with new scores and totals updated', () => {
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
    test('setter ignores extraneous properties', () => {
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