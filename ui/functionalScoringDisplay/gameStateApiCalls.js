export const getGameState = () =>
  fetch('http://localhost:3000/api/gameState', { method: 'GET' }).then(
    response => {
      return response.json();
    }
  );
