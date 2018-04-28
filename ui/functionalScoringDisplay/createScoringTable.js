const writeScoringRow = (row, qIndex) => {
  return row
    .map((score, teamIndex) => {
      return answerRadioButtons(score, teamIndex, qIndex);
    })
    .join("\n");
};

const writeRadioCell = (score, name) => {
  const YChecked = score > 0 ? "checked" : "";
  const NChecked = YChecked === "" ? "checked" : "";

  return `${radioButton(name, "Y", YChecked)}
          ${radioButton(name, "N", NChecked)}`;
};

const radioButton = (inputName, label, checked = "") => {
  return `<input type="radio" name="${inputName}"
    value="${label}" ${checked} onclick="changeScore(this)"><label>${label}</label>`;
};

const getIndicesFromRadioName = (string) => {
  //string is in form: `team${teamIndex}_Q${qIndex}`
  const strings = string.split("_")
  const teamIndex = strings[0].replace(/team/g, '')
  const qIndex = strings[1].replace(/Q/g,'')
  return { qIndex, teamIndex }
}

const changeScore = async (el) => {
  const { qIndex, teamIndex } = getIndicesFromRadioName(el.name)
  const points = el.value === 'Y' ? 1 : 0
  await updateTeamScore({ qIndex, teamIndex, points })
  generateScoreTable()
}

const writeScoreTableHeader = teamNames => {
  return teamNames
    .map(teamName => {
      return `<th>${teamName}</th>`;
    })
    .join("\n");
};

const identity = val => val;

const writeTableRow = (
  list,
  rowHeader,
  tagType = "td",
  cellRenderer = identity
) => {
  return `
    <tr>
      <${tagType}>
        ${rowHeader}
      </${tagType}>
      ${list
        .map(
          (cellValue, index) => `
        <${tagType}>
        ${cellRenderer(cellValue, `team${index}_Q${rowHeader}`)}
        </${tagType}>`
        )
        .join("\n")}
    </tr>`;
};

const writeScoringTable = (teamNames, scores, totals) => {
  return `<table>
            <thead>
              ${writeTableRow(teamNames, "Q#", "th")}
            </thead>
            <tbody>
              ${scores
                .map((row, index) =>
                  writeTableRow(row, index, "td", writeRadioCell)
                )
                .join("\n")}
              ${writeTableRow(totals, "total")}
            </tbody>
          </table>`;
};

const scores = [[0, 1, 1, 0], [0, 0, 1, 0], [0, 1, 0, 1]];
const teamNames = ["hi", "bye", "c-ya", "later"];
writeTeamNames(teamNames);
writeScores(scores);
const generateScoreTable = () => {
  const scoreTableWrapperElement = document.getElementById("scoreTableWrapper");
  const teamNamesPromise = getTeamNames();
  const scoresPromise = getScores();
  Promise.all([teamNamesPromise, scoresPromise])
    .then(data => {
      const teamNames = data[0];
      const scores = data[1].scores;
      const totals = data[1].totals;
      scoreTableWrapperElement.innerHTML = writeScoringTable(
        teamNames,
        scores,
        totals
      );
    })
    .catch(error => {
      console.log("error getting retrieving from server: ", error);
      scoreTableWrapperElement.innerHTML = `<span>Houston, we have a problem: ${error}</span>`;
    });
};

document.getElementById("loadTeams").innerHTML =
  '<button onclick="generateScoreTable()">Load Scoring Table</button>';
