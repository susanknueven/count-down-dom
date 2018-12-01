import { GENERAL_TRIVIA } from "../ui/utils/stateConstants";

export const trivia = (() => {
  let trivia = {};
  const pop = group => {
    const nextTrivia = trivia[group] ? trivia[group].pop() : undefined;
    return nextTrivia;
  };

  const load = (group, path) => {
    const triviaFromFile = require(path);
    // map to create new objects, not references
    trivia[group] = triviaFromFile.map(function(obj){ return Object.assign({}, obj)});
  };

  const questionsRemaining = group => {
    return trivia[group] ? trivia[group].length : 0;
  };

  const reset = () => {
    trivia = {};
  };
  return { pop, load, reset, questionsRemaining };
})();
