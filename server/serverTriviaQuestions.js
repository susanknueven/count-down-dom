export const loadTrivia = trivia => {
  console.log('loadTrivia', trivia);
  const popTrivia = () => {
    return trivia.pop();
  };
  return popTrivia;
};
