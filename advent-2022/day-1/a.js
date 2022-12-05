const fs = require('fs');
const contents = fs.readFileSync('input.txt', 'utf8');

const mostCalories = Math.max(
  ...contents
    .split('\n\n')
    .map((elf) => elf.split('\n').reduce((acc, curr) => acc + Number(curr), 0))
);

console.log('Most calories: ', mostCalories); // Most calories: 66306
