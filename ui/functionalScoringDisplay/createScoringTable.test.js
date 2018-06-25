import {
  writeRadioCell,
  getIndicesFromRadioName,
  generateRadioName,
  writeTableRow
} from './createScoringTable.js';
import { writeScoringTable } from './createScoringTable';

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

    test('generates id with team and question indices', () => {
      const expectId = 'team5_Q1';
      const id = generateRadioName(5, 1);
      expect(id).toEqual(expectId);
    });
  });

  describe('write table row', () => {
    const list = [0, 0, 1, 0];
    const rowHeader = 'Q1';
    const createTableFromHTML = html => {
      const div = document.createElement('div');
      div.innerHTML = `<table>${html}</table>`;
      return div;
    };

    test('returns cells with rowHeader in first cell', () => {
      const div = createTableFromHTML(writeTableRow(list, rowHeader));
      const cellContents = div.getElementsByTagName('td')[0].innerHTML.trim();

      expect(cellContents).toBe(rowHeader);
    });

    test('creates cells for each item in list passed in', () => {
      const div = createTableFromHTML(writeTableRow(list, rowHeader));
      const cells = div.getElementsByTagName('td');

      expect(cells[1].innerHTML.trim()).toBe(list[0].toString());
      expect(cells[2].innerHTML.trim()).toBe(list[1].toString());
      expect(cells[3].innerHTML.trim()).toBe(list[2].toString());
      expect(cells[4].innerHTML.trim()).toBe(list[3].toString());
    });

    test('cell tag defaults to td when not specified', () => {
      const div = createTableFromHTML(writeTableRow(list, rowHeader));
      const tdElements = div.getElementsByTagName('td');
      const thElements = div.getElementsByTagName('th');

      expect(tdElements.length).toBe(5);
      expect(thElements.length).toBe(0);
    });

    test('cell tag applies type specified', () => {
      const div = createTableFromHTML(writeTableRow(list, rowHeader, 'th'));
      const tdElements = div.getElementsByTagName('td');
      const thElements = div.getElementsByTagName('th');

      expect(tdElements.length).toBe(0);
      expect(thElements.length).toBe(5);
    });

    test('cell renders list strings passed in when renderer not specified', () => {
      const div = createTableFromHTML(writeTableRow(list, rowHeader));
      const cells = div.getElementsByTagName('td');

      expect(cells[1].innerHTML.trim()).toBe(list[0].toString());
      expect(cells[2].innerHTML.trim()).toBe(list[1].toString());
      expect(cells[3].innerHTML.trim()).toBe(list[2].toString());
      expect(cells[4].innerHTML.trim()).toBe(list[3].toString());
    });

    test('cell renders list values with renderer passed in', () => {
      const renderer = input => {
        return `0${input}`;
      };
      const div = createTableFromHTML(
        writeTableRow(list, rowHeader, 'td', renderer)
      );
      const cells = div.getElementsByTagName('td');

      expect(cells[1].innerHTML.trim()).toBe(renderer(list[0]));
      expect(cells[2].innerHTML.trim()).toBe(renderer(list[1]));
      expect(cells[3].innerHTML.trim()).toBe(renderer(list[2]));
      expect(cells[4].innerHTML.trim()).toBe(renderer(list[3]));
    });
  });

  describe('write table', () => {
    const rowHeader = 'Q#';
    const teamNames = ['theCats', 'bigDogs'];
    const scores = [[0, 1], [0, 0], [1, 1]];
    const totals = [1, 2];
    let tableDiv;

    beforeAll(() => {
      const html = writeScoringTable(teamNames, scores, totals);
      tableDiv = document.createElement('div');
      tableDiv.innerHTML = html;
    });

    test('creates header row with team names', () => {
      const headers = tableDiv.getElementsByTagName('thead')[0].innerHTML;

      expect(headers).toEqual(expect.stringContaining(rowHeader));
      expect(headers).toEqual(expect.stringContaining(teamNames[0]));
      expect(headers).toEqual(expect.stringContaining(teamNames[1]));
    });

    test('creates footer row with team score totals', () => {
      const footers = tableDiv.getElementsByTagName('tfoot')[0].innerHTML;

      expect(footers).toEqual(expect.stringContaining('total'));
      expect(footers).toEqual(expect.stringContaining(totals[0].toString()));
      expect(footers).toEqual(expect.stringContaining(totals[1].toString()));
    });

    test('accepts array of scores and creates row for each set of scores', () => {
      const rows = tableDiv.getElementsByTagName('tbody')[0].children;

      expect(rows.length).toBe(scores.length);
      expect(rows[0].innerHTML).toEqual(expect.stringContaining('radio'));
    });
  });
});
