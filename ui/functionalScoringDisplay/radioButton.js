export const writeRadioCell = (score, name) => {
  const YChecked = score > 0 ? 'checked' : '';
  const NChecked = score === 0 ? 'checked' : '';

  return `${radioButton(name, 'Y', YChecked)}
          ${radioButton(name, 'N', NChecked)}`;
};

const radioButton = (inputName, label, checked = '') => {
  return `<input type='radio' name='${inputName}'
    value='${label}' ${checked}><label>${label}</label>`;
};

export const getIndicesFromRadioName = string => {
  //string is in form: `team${teamIndex}_Q${qIndex}`
  const strings = string.split('_');
  const teamIndex = strings[0].replace(/team/g, '');
  const qIndex = strings[1].replace(/Q/g, '');
  return { teamIndex, qIndex };
};

export const generateRadioName = (teamIndex, qIndex) => {
  return `team${teamIndex}_Q${qIndex}`;
};
