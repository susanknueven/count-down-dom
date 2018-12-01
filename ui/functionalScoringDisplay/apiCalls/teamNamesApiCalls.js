export const writeTeamNames = teamNames =>
  fetchPost('http://localhost:3000/api/teamNames', teamNames, 'writeTeamNames');