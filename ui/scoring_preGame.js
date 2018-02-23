

function generateTeamInputElement() {
  const teamNamesWrapper = document.getElementById('teamNames');
  const teamNamesHeadingElement = document.createElement('div');
  teamNamesHeadingElement.innerHTML = 'Enter team names, separated by commas:';
  const teamNamesInputElement = document.createElement('textarea');
  teamNamesInputElement.id = 'teamNamesInput';
  teamNamesInputElement.maxLength = '500';
  teamNamesInputElement.cols = '40';
  teamNamesInputElement.rows = '10';

  teamNamesWrapper.appendChild(teamNamesHeadingElement);
  teamNamesWrapper.appendChild(teamNamesInputElement);
}

function generateQuestionInputElement() {
  const numOfQsWrapper = document.getElementById('numOfQs');
  const numOfQsHeadingElement = document.createElement('div');
  numOfQsHeadingElement.innerHTML = 'Enter # of Questions for the Game';
  const numOfQsInputElement = document.createElement('textarea');
  numOfQsInputElement.id = 'numOfQsInput';
  numOfQsInputElement.maxLength = '50';
  numOfQsInputElement.cols = '10';
  numOfQsInputElement.rows = '1';

  numOfQsWrapper.appendChild(numOfQsHeadingElement);
  numOfQsWrapper.appendChild(numOfQsInputElement);
}

function generatePreGameTools() {
  generateTeamInputElement();
  generateQuestionInputElement();
}

function initializePreGame() {
    generatePreGameTools();
    setGameState(PRE_GAME);
    hideInGameTools();
}

function getTeamNamesInputString() {
  return document.getElementById('teamNamesInput').value;
}

function initializeTeams() {
  const teamNamesInString = getTeamNamesInputString();
  const teamArray = teamNamesInString.split(',');
  return teamArray.map(teamName => teamName.trim());
}
