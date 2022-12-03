const fs = require('fs');
const contents = fs.readFileSync('input.txt', 'utf8');

// A (Rock) X (scissors) = 0 + 3 = 3 // lose
// A (rock) Y (rock) = 3 + 1 = 4     // draw
// A (rock) Z (paper) = 6 + 2 = 8    // win

// B (Paper) X (rock) = 0 + 1 = 1      // lose
// B (paper) Y (paper) = 3 + 2 = 5     // draw
// B (paper) Z (scissors) = 6 + 3 = 9  // win

// C (Scissors) X (paper) = 0 + 2 = 2     // lose
// C (scissors) Y (scissors) = 3 + 3 = 6  // draw
// C (scissors) Z (rock) = 6 + 1 = 7      // win

const outcomes = {
  'A X': 3,
  'A Y': 4,
  'A Z': 8,
  'B X': 1,
  'B Y': 5,
  'B Z': 9,
  'C X': 2,
  'C Y': 6,
  'C Z': 7,
};

const total = contents
  .split('\n')
  .reduce((acc, curr) => outcomes[curr] + acc, 0);

console.log(total);
