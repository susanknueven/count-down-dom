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
    value="${label}" ${checked}><label>${label}</label>`;
};

const writeScoreTableHeader = teamNames => {
  return teamNames
    .map(teamName => {
      return `<th>${teamName}</th>`;
    })
    .join("\n");
};

const identity = val => val;

const calculateTotals = scores =>
  scores.reduce((acc, row) => {
    for (let index in row) {
      acc[index] = (acc[index] || 0) + row[index];
    }
    return acc;
  }, []);

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

const writeScoringTable = (scores, teamNames) => {
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
              ${writeTableRow(calculateTotals(scores), "total")}
            </tbody>
          </table>`;
};

const teamNamesLocal = ["hi", "bye", "c-ya", "later"];
writeTeamNames(teamNamesLocal);
const scores = [[0, 1, 1, 0], [0, 0, 1, 0], [0, 1, 0, 1]];
const generateScoreTable = () => {
  const scoreTableWrapperElement = document.getElementById("scoreTableWrapper");
  getTeamNames()
    .then(json => {
      scoreTableWrapperElement.innerHTML = writeScoringTable(scores, json);
    })
    .catch(error => {
      console.log("error getting team names: ", error);
      scoreTableWrapperElement.innerHTML = `<span>Houston, we have a problem: ${error}</span>`;
    });
};

document.getElementById("loadTeams").innerHTML =
  '<button onclick="generateScoreTable()">getTeamNames</button>';
