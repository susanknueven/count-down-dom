export const displayCategory = () =>
  fetch('http://localhost:3000/api/displayCategory', { method: 'GET' })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log('error writing team scores:', err);
    });

export const displayQuestion = () =>
  fetch('http://localhost:3000/api/displayQuestion', { method: 'GET' })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log('error writing team scores:', err);
    });

export const displayAnswer = () =>
  fetch('http://localhost:3000/api/displayAnswer', { method: 'GET' })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log('error writing team scores:', err);
    });
