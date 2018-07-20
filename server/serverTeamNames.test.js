import { resetGameState, gameStateSetter } from './serverGameState.js';
import { writeTeamNames } from './serverTeamNames.js';

describe('server team names', () => {
  const originalTeamNames = ['sting', 'cher', 'prince'];
  beforeEach(() => {
    resetGameState();
    gameStateSetter({ teamNames: originalTeamNames });
  });
  test('replaces teamNames on server', () => {
    const teamNames = ['jordan', 'shaq'];
    const ctx = {
      request: { body: JSON.stringify({ teamNames }) },
      response: {}
    };

    const { response } = writeTeamNames(ctx);

    expect(response.body.teamNames).toEqual(teamNames);
  });
  test('throws error if no teamNames passed in', () => {
    const ctx = { request: { body: JSON.stringify({}) }, response: {} };

    expect(() => {
      writeTeamNames(ctx);
    }).toThrow('No team names provided.');
  });
});
