const fs = require('fs');
const contents = fs.readFileSync('input.txt', 'utf8');

// A (Rock) Z (scissors) = 0 + 3 = 3
// A (rock) X (rock) = 3 + 1 = 4
// A (rock) Y (paper) = 6 + 2 = 8

// B (Paper) X (rock) = 0 + 1 = 1
// B (paper) Y (paper) = 3 + 2 = 5
// B (paper) Z (scissors) = 6 + 3 = 9

// C (Scissors) Y (paper) = 0 + 2 = 2
// C (scissors) Z (scissors) = 3 + 3 = 6
// C (scissors) X (rock) = 6 + 1 = 7

const outcomes = {
  'A Z': 3,
  'A X': 4,
  'A Y': 8,
  'B X': 1,
  'B Y': 5,
  'B Z': 9,
  'C Y': 2,
  'C Z': 6,
  'C X': 7,
};

const total = contents
  .split('\n')
  .reduce((acc, curr) => outcomes[curr] + acc, 0);

console.log(total);
