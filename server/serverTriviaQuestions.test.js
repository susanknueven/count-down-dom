import { loadTrivia } from './serverTriviaQuestions.js';
import mockTrivia from './trivia_questions.json';

describe('trivia questions', () => {
  test('returns trivia when called', () => {
    const getNextTriviaQuestion = loadTrivia(mockTrivia);
    const { category, question, answer } = getNextTriviaQuestion();
    expect(category).toBeDefined;
    expect(question).toBeDefined;
    expect(answer).toBeDefined;
  });
  test('removes trivia from set', () => {
    const origLength = mockTrivia.length;
    expect(origLength).toBeGreaterThan(0);
    const getNextTriviaQuestion = loadTrivia(mockTrivia);
    getNextTriviaQuestion();
    expect(origLength - mockTrivia.length).toBe(1);
  });
  test('loads json from file', () => {
    const getNextQuestion = loadTrivia(require('./trivia_questions.json'));
    console.log('getNext', getNextQuestion());
    console.log('getNext2', getNextQuestion());
    console.log('getNext3', getNextQuestion());
  });
});
