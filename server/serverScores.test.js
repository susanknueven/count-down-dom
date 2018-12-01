import {
  calculateTotals,
  updateTeamScore,
  createScoresForNextQuestion
} from './serverScores.js';
import { resetGameState, gameStateSetter } from './serverGameState.js';

describe('calculates team totals from scores array', () => {
  test('when scores has undefined values', () => {
    const scores = [[1, 0], [undefined, undefined]];
    const expectedTotals = [1, 0];

    const totals = calculateTotals(scores);
    expect(totals).toEqual(expectedTotals);
  });
  test('for multiple teams and multiple questions', () => {
    const scores = [[1, 0, 1], [1, 0, 1], [0, 0, 0]];
    const expectedTotals = [2, 0, 2];

    const totals = calculateTotals(scores);
    expect(totals).toEqual(expectedTotals);
  });
  test('returns empty array for empty scores array', () => {
    const scores = [];
    const expectedTotals = [];

    const totals = calculateTotals(scores);
    expect(totals).toEqual(expectedTotals);
  });
  test('returns zeros scores undefined', () => {
    const scores = [[undefined, undefined]];
    const expectedTotals = [0, 0];

    const totals = calculateTotals(scores);
    expect(totals).toEqual(expectedTotals);
  });
});

describe('add new row to scores array', () => {
  beforeEach(() => {
    resetGameState();
  });
  test('handles empty array', () => {
    const gameState = { scores: [], teamNames: ['team1', 'team2'], totals: [] };

    const { scores, totals } = createScoresForNextQuestion(gameState);

    expect(scores).toEqual([[undefined, undefined]]);
    expect(totals).toEqual([0, 0]);
  });

  test('handles non-empty array', () => {
    const gameState = {
      scores: [[1, 0, 0]],
      teamNames: ['team1', 'team2', 'team3'],
      totals: [1, 0, 0]
    };

    const { scores, totals } = createScoresForNextQuestion(gameState);

    expect(scores).toEqual([[1, 0, 0], [undefined, undefined, undefined]]);
    expect(totals).toEqual([1, 0, 0]);
  });

  test('throws error when no teams registered', () => {
    expect(() => {
      createScoresForNextQuestion({ teamNames: [] });
    }).toThrow('Cannot retrieve scores when no teams registered.');
  });
});

describe('scores', () => {
  beforeEach(() => {
    resetGameState();
    gameStateSetter({ teamNames: ['team0', 'team1'], scores: [[0, 1]] });
  });
  test('updates team score and totals', () => {
    const qIndex = 0;
    const teamIndex = 0;
    const points = 1;
    const ctx = {
      request: { body: JSON.stringify({ qIndex, teamIndex, points }) },
      response: {}
    };

    const { response } = updateTeamScore(ctx);

    expect(response.body.scores).toEqual([[1, 1]]);
    expect(response.body.totals).toEqual([1, 1]);
  });
  // TODO: test if indexes are bad in score update?? i.e. scores[qIndex][teamIndex] throws error
});
