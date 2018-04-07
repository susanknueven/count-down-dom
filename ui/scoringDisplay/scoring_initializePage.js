
function initializeScoresPageByGameState(gameState) {
  if (gameState != IN_GAME) {
    initializePreGame(gameState);
  } else {
    initializeInGame(gameState, getTriviaState(), getTriviaIndex());
  }
}

initializeScoresPageByGameState(getGameState());