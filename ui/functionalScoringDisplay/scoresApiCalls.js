export const getScores = () =>
  fetch('http://localhost:3000/api/scores', { method: 'GET' }).then(
    response => {
      return response.json();
    }
  );

export const writeScores = scores =>
  fetch('http://localhost:3000/api/scores', {
    method: 'POST',
    body: JSON.stringify(scores)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log('error writing team scores:', err);
    });

export const updateTeamScore = score =>
  fetch('http://localhost:3000/api/scores', {
    method: 'PUT',
    body: JSON.stringify(score)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log('error updating team score:', err);
    });

export const getNewRow = () =>
  fetch('http://localhost:3000/api/getNewRow', { method: 'GET' })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log('error getting new question:', err);
    });