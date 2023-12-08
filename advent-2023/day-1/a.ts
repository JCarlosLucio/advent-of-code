/* --- Day 1: Trebuchet?! --- Part A --- */
// https://adventofcode.com/2023/day/1

const file = Bun.file('input.txt');
const input = await file.text();
const testInput = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const getValues = (line: string) => {
  let first = null;
  let last = null;
  for (const char of line) {
    const number = Number(char);
    if (Number.isInteger(number)) {
      if (first == null) {
        first = number;
      }
      last = number;
    }
  }
  if (first == null || last == null) return 0;

  return first * 10 + last;
};

const sumValues = (input: string) => {
  return input
    .split('\n')
    .map(getValues)
    .reduce((acc, curr) => acc + curr, 0);
};

console.log('The sum of all the calibration values: ', sumValues(input)); // The sum of all the calibration values:  55607
