
const d3 = require('d3-dsv');
const fs = require('fs');

const get_trivia = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('trivia_questions.txt', 'utf8', (err, data) => {
      if (err) throw reject(err);
      const array = d3.tsvParse(data);
      resolve(array);
    });
  });
}
get_trivia().then((array) => console.log('array', array));