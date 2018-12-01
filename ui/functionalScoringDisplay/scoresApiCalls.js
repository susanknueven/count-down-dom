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

export const getNextQuestion = (group) =>
  fetch('http://localhost:3000/api/getNextQuestion', {
    method: 'POST',
    body: JSON.stringify({ group })
  })
    .then(status)
    .catch(err => {
      console.log('error getting next question:', err);
    });

const status = response => {
  console.log('apiCall Response', response)
  if(!response.ok) {
    return Promise.reject(response.json());
  }
  return response.json();
}