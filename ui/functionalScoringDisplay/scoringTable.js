import { writeRadioCell, generateRadioName } from './radioButton.js';

const identity = val => val;

export const writeTableRow = (
  list,
  rowHeader,
  tagType = 'td',
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
        ${cellRenderer(cellValue, generateRadioName(index, rowHeader))}
        </${tagType}>`
        )
        .join('\n')}
    </tr>`;
};

const scoreTableLabel = () => {
  return '<div class="scoreTableLabel">Team Scores:</div>';
};

export const generateScoringTable = (teamNames, scores, totals) => {
  return `
    ${scoreTableLabel()}
    <table>
      <thead id='thead'>
        ${writeTableRow(teamNames, 'Q#', 'th')}
      </thead>
      <tbody id='tbody'>
        ${scores
          .map((row, index) => writeTableRow(row, index, 'td', writeRadioCell))
          .join('\n')}
      </tbody>
      <tfoot id='tfoot'>
        ${writeTableRow(totals, 'total')}
      </tfoot>
    </table>`;
};
