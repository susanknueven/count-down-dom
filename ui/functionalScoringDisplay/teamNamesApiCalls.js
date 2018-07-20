export const writeTeamNames = teamNames =>
  fetch('http://localhost:3000/api/teamNames', {
    method: 'POST',
    body: JSON.stringify(teamNames)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log('error writing team names:', err);
    });
