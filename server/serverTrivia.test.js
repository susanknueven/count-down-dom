import { trivia } from './serverTrivia.js';

const file = './mockTrivia.json';

describe('server trivia module', () => {
  // describe('load function', () => {
  //   test('loads trivia by group and file path', () => {});
  //   test('loads json from file', () => {});
  // });
  describe('pop function', () => {
    const popGroup = 'pop'
    beforeEach(() => {
      trivia.reset();
      trivia.load(popGroup, file);
    });
    test('returns trivia when called', () => {
      const { category, question, answer } = trivia.pop(popGroup);
      expect(category).toBeDefined;
      expect(question).toBeDefined;
      expect(answer).toBeDefined;
    });
    test('removes trivia from set', () => {
      const origLength = trivia.questionsRemaining(popGroup);
      expect(origLength).toBeGreaterThan(0);

      trivia.pop(popGroup);

      const newLength = trivia.questionsRemaining(popGroup);
      expect(origLength - newLength).toBe(1);
    });
  });
  describe('questionsRemaining function', () => {
    test('returns number of questions in group', () => {
      trivia.load('qRemaining', file);

      expect(trivia.questionsRemaining('qRemaining')).toBe(4);
    });
  });
  describe('reset function', () => {
    test('clears trivia from memory', () => {
      const group = 'triviaToClear'
      trivia.load(group, file);
      expect(trivia.questionsRemaining(group)).toBeGreaterThan(0);

      trivia.reset();

      expect(trivia.questionsRemaining(group)).toBe(0);
    });
  });
});
