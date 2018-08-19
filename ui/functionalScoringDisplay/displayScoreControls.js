import { generateScoringTable } from './scoringTable.js';
import { triviaControlButtons, triviaPreviewText } from './triviaControl.js';

//side-effects:
export const displayScoreControls = gameState => {
  const rootElement = document.getElementById('root');
  rootElement.innerHTML = `
    ${generateScoringTable(
      gameState.teamNames,
      gameState.scores,
      gameState.totals
    )}
    ${triviaControlButtons(gameState)}
    ${triviaPreviewText(gameState)}
    `;
};
