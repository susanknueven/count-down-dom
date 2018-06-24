import {
  calculateTotals,
  getNewRow,
  teamNamesSetter,
  scoresGetter,
  scoresSetter,
  writeScores
} from './koa-server.js';

describe('koa-server tests', () => {
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
      teamNamesSetter([]);
      scoresSetter([]);
    });
    test('handles empty array', () => {
      const ctx = { response: {} };
      const scores = [];
      const teamNames = ['team1', 'team2'];
      const expectedBody = { scores: [[undefined, undefined]], totals: [0, 0] };

      teamNamesSetter(teamNames);
      scoresSetter(scores);
      const returnedCtx = getNewRow(ctx);

      expect(returnedCtx.response.body).toEqual(expectedBody);
    });

    test('handles non-empty array', () => {
      const ctx = { response: {} };
      const scores = [[1, 0, 0]];
      const teamNames = ['team1', 'team2', 'team3'];
      const expectedBody = {
        scores: [[1, 0, 0], [undefined, undefined, undefined]],
        totals: [1, 0, 0]
      };

      teamNamesSetter(teamNames);
      scoresSetter(scores);
      const returnedCtx = getNewRow(ctx);

      expect(returnedCtx.response.body).toEqual(expectedBody);
    });
  });
  describe('writeScores', () => {
    test('parses score from ctx and sets on server', () => {
      const scores = [[1]];
      const ctx = { request: { body: JSON.stringify(scores) }, response: {} };

      writeScores(ctx);
      const scoresOnServer = scoresGetter();

      expect(scoresOnServer).toEqual(scores);
    });
  });
});
