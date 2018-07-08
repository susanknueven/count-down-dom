import {
  calculateTotals,
  updateTeamScore,
  getScores,
  getNewRow
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
    const ctx = { response: {} };
    const scores = [];
    const teamNames = ['team1', 'team2'];
    const expectedBody = {
      scores: [[undefined, undefined]],
      teamNames,
      totals: [0, 0]
    };

    gameStateSetter({ teamNames, scores });
    const { response } = getNewRow(ctx);

    expect(response.body).toEqual(expectedBody);
  });

  test('handles non-empty array', () => {
    const ctx = { response: {} };
    const scores = [[1, 0, 0]];
    const teamNames = ['team1', 'team2', 'team3'];
    const expectedBody = {
      scores: [[1, 0, 0], [undefined, undefined, undefined]],
      totals: [1, 0, 0],
      teamNames
    };

    gameStateSetter({ teamNames, scores });
    const { response } = getNewRow(ctx);

    expect(response.body).toEqual(expectedBody);
  });
  test('throws error when no teams registered', () => {
    const ctx = { response: {} };
    expect(() => {
      getNewRow(ctx);
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
  //test if indexes are bad in score update?? i.e. scores[qIndex][teamIndex] throws error
  test('gets scores', () => {
    const ctx = { response: {} };

    const { response } = getScores(ctx);

    expect(response.body.scores).toEqual([[0, 1]]);
    expect(response.body.totals).toEqual([0, 1]);
  });
});
