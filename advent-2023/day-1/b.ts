/* --- Day 1: Trebuchet?! --- Part B --- */
// https://adventofcode.com/2023/day/1#part2

const file = Bun.file('input.txt');
const input = await file.text();
const testInput = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

const numsAsWords = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
];

const getValues = (line: string) => {
  let first = -1;
  let last = -1;

  let firstAsWord = '';

  for (const char of line) {
    const number = Number(char);
    if (Number.isInteger(number)) {
      if (first == -1) {
        first = number;
      }
      last = number;
    } else {
      firstAsWord += char;
      for (let i = firstAsWord.length - 1; i >= 0; i--) {
        const num = numsAsWords.indexOf(firstAsWord.slice(i));
        if (num !== -1) {
          if (first === -1) {
            first = num;
          }

          last = num;
          break;
        }
      }
    }
  }

  return first * 10 + last;
};

const sumValues = (input: string) => {
  return input
    .split('\n')
    .map(getValues)
    .reduce((acc, curr) => acc + curr, 0);
};

console.log('The sum of all the calibration values: ', sumValues(input)); // The sum of all the calibration values:  55291
