import {
  writeRadioCell,
  getIndicesFromRadioName
} from './createScoringTable.js';

const parser = new DOMParser();
describe('create scoring table', () => {
  describe('radio buttons', () => {
    const getRadioButtonsChecked = html => {
      const div = document.createElement('div');
      div.innerHTML = html;
      const inputElements = div.getElementsByTagName('input');
      return Array.prototype.reduce.call(
        inputElements,
        (acc, el) => {
          if (el.value === 'Y') {
            acc['yesRadioChecked'] = el.hasAttribute('checked');
          }
          if (el.value === 'N') {
            acc['noRadioChecked'] = el.hasAttribute('checked');
          }
          return acc;
        },
        {}
      );
    };

    test('returns radio button with yes checked when score greater than zero', () => {
      const radiosHtml = writeRadioCell(1, 'myName');
      const { yesRadioChecked, noRadioChecked } = getRadioButtonsChecked(
        radiosHtml
      );
      expect(yesRadioChecked).toBe(true);
      expect(noRadioChecked).toBe(false);
    });

    test('returns radio button with no checked when score is zero', () => {
      const radiosHtml = writeRadioCell(0, 'myName');
      const { yesRadioChecked, noRadioChecked } = getRadioButtonsChecked(
        radiosHtml
      );
      expect(yesRadioChecked).toBe(false);
      expect(noRadioChecked).toBe(true);
    });

    test('returns radio button with none checked when score is undefined', () => {
      const radiosHtml = writeRadioCell(undefined, 'myName');
      const { yesRadioChecked, noRadioChecked } = getRadioButtonsChecked(
        radiosHtml
      );
      expect(yesRadioChecked).toBe(false);
      expect(noRadioChecked).toBe(false);
    });

    test('parses id into question and team indices', () => {
      const qIndexExpect = '5';
      const teamIndexExpect = '1';
      const { qIndex, teamIndex } = getIndicesFromRadioName(
        `team${teamIndexExpect}_Q${qIndexExpect}`
      );
      expect(qIndex).toEqual(qIndexExpect);
      expect(teamIndex).toEqual(teamIndexExpect);
    });
  });
});
