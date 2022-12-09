/* --- Day 6: Tuning Trouble --- Part A --- */
// https://adventofcode.com/2022/day/6

const fs = require('fs');
const contents = fs.readFileSync('input.txt', 'utf8');

const hasNoDuplicates = (str) => str.length === new Set(str).size;

const firstMarker = (data, num) => {
  for (let i = num; i < data.length; i++) {
    const marker = data.slice(i - num, i);
    if (hasNoDuplicates(marker)) {
      return i;
    }
  }
};

console.log('First marker after char: ', firstMarker(contents, 4)); // First marker after char: 1909
