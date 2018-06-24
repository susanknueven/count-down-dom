export const writeRadioCell = (score, name) => {
  const YChecked = score > 0 ? 'checked' : '';
  const NChecked = score === 0 ? 'checked' : '';

  return `${radioButton(name, 'Y', YChecked)}
          ${radioButton(name, 'N', NChecked)}`;
};

const radioButton = (inputName, label, checked = '') => {
  return `<input type="radio" name="${inputName}"
    value="${label}" ${checked}><label>${label}</label>`;
};

export const getIndicesFromRadioName = string => {
  //string is in form: `team${teamIndex}_Q${qIndex}`
  const strings = string.split('_');
  const teamIndex = strings[0].replace(/team/g, '');
  const qIndex = strings[1].replace(/Q/g, '');
  return { teamIndex, qIndex };
};

const generateRadioName = (teamIndex, qIndex) => {
  return `team${teamIndex}_Q${qIndex}`;
};

const identity = val => val;

const writeTableRow = (
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

export const writeScoringTable = (teamNames, scores, totals) => {
  return `<table>
            <thead>
              ${writeTableRow(teamNames, 'Q#', 'th')}
            </thead>
            <tbody>
              ${scores
                .map((row, index) =>
                  writeTableRow(row, index, 'td', writeRadioCell)
                )
                .join('\n')}
              ${writeTableRow(totals, 'total')}
            </tbody>
          </table>`;
};
