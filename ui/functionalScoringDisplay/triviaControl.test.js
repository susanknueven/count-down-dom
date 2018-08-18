import { triviaControlButtons, triviaPreviewText } from './triviaControl.js';
import {
  QUESTION_LOADED,
  SHOW_CATEGORY,
  SHOW_QUESTION,
  SHOW_ANSWER
} from '../utils/stateConstants.js';
import { getById } from '../utils/utils.js';

describe('triviaControls', () => {
  test('4 control buttons', () => {
    document.body.innerHTML = triviaControlButtons({});
    const buttons = document.getElementsByTagName('button');
    expect(buttons.length).toBe(4);
  });
  test('only showCategoryButton enabled when question loaded', () => {
    const state = { gameOperatorView: QUESTION_LOADED };
    document.body.innerHTML = triviaControlButtons(state);
    expect(getById('nextQuestionButton').hasAttribute('disabled')).toBe(true);
    expect(getById('showCategory').hasAttribute('disabled')).toBe(false);
    expect(getById('showQuestion').hasAttribute('disabled')).toBe(true);
    expect(getById('showAnswer').hasAttribute('disabled')).toBe(true);
  });
  test('only showQuestionButton enabled when category displayed', () => {
    const state = { gameOperatorView: SHOW_CATEGORY };
    document.body.innerHTML = triviaControlButtons(state);
    expect(getById('nextQuestionButton').hasAttribute('disabled')).toBe(true);
    expect(getById('showCategory').hasAttribute('disabled')).toBe(true);
    expect(getById('showQuestion').hasAttribute('disabled')).toBe(false);
    expect(getById('showAnswer').hasAttribute('disabled')).toBe(true);
  });
  test('only showAnswerButton enabled when question displayed', () => {
    const state = { gameOperatorView: SHOW_QUESTION };
    document.body.innerHTML = triviaControlButtons(state);
    expect(getById('nextQuestionButton').hasAttribute('disabled')).toBe(true);
    expect(getById('showCategory').hasAttribute('disabled')).toBe(true);
    expect(getById('showQuestion').hasAttribute('disabled')).toBe(true);
    expect(getById('showAnswer').hasAttribute('disabled')).toBe(false);
  });
  test('only nextQuestionButton enabled when answer displayed', () => {
    const state = { gameOperatorView: SHOW_ANSWER };
    document.body.innerHTML = triviaControlButtons(state);
    expect(getById('nextQuestionButton').hasAttribute('disabled')).toBe(false);
    expect(getById('showCategory').hasAttribute('disabled')).toBe(true);
    expect(getById('showQuestion').hasAttribute('disabled')).toBe(true);
    expect(getById('showAnswer').hasAttribute('disabled')).toBe(true);
  });
});
describe('triviaPreviewText', () => {
  test('returns category, question and answer', () => {
    const state = {
      trivia: {
        category: 'Sesame Street',
        question: 'Best friend of Big Bird',
        answer: 'Snuffy'
      }
    };

    document.body.innerHTML = triviaPreviewText(state);

    expect(getById('triviaCategory').innerHTML).toEqual(
      expect.stringContaining(state.trivia.category)
    );
    expect(getById('triviaQuestion').innerHTML).toEqual(
      expect.stringContaining(state.trivia.question)
    );
    expect(getById('triviaAnswer').innerHTML).toEqual(
      expect.stringContaining(state.trivia.answer)
    );
  });
  test('returns undefined when no trivia', () => {
    const state = {
      trivia: {}
    };

    document.body.innerHTML = triviaPreviewText(state);

    expect(getById('triviaCategory').innerHTML).toEqual(
      expect.stringContaining('undefined')
    );
    expect(getById('triviaQuestion').innerHTML).toEqual(
      expect.stringContaining('undefined')
    );
    expect(getById('triviaAnswer').innerHTML).toEqual(
      expect.stringContaining('undefined')
    );
  });
  test('highlight trivia category when category is displayed', () => {
    document.body.innerHTML = triviaPreviewText({
      gameOperatorView: SHOW_CATEGORY
    });

    expect(getById('triviaCategory').classList.contains('display')).toBe(true);
    expect(getById('triviaQuestion').classList.contains('display')).toBe(false);
    expect(getById('triviaAnswer').classList.contains('display')).toBe(false);
  });
  test('highlight trivia question when question is displayed', () => {
    document.body.innerHTML = triviaPreviewText({
      gameOperatorView: SHOW_QUESTION
    });

    expect(getById('triviaCategory').classList.contains('display')).toBe(true);
    expect(getById('triviaQuestion').classList.contains('display')).toBe(true);
    expect(getById('triviaAnswer').classList.contains('display')).toBe(false);
  });
  test('highlight trivia answer when answer is displayed', () => {
    document.body.innerHTML = triviaPreviewText({
      gameOperatorView: SHOW_ANSWER
    });

    expect(getById('triviaCategory').classList.contains('display')).toBe(true);
    expect(getById('triviaQuestion').classList.contains('display')).toBe(true);
    expect(getById('triviaAnswer').classList.contains('display')).toBe(true);
  });
  test('remove highlights when next question loaded', () => {
    document.body.innerHTML = triviaPreviewText({
      gameOperatorView: QUESTION_LOADED
    });

    expect(getById('triviaCategory').classList.contains('display')).toBe(false);
    expect(getById('triviaQuestion').classList.contains('display')).toBe(false);
    expect(getById('triviaAnswer').classList.contains('display')).toBe(false);
  });
});
