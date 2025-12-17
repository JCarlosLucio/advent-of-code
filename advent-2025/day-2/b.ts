/* --- Day 2: Gift Shop  --- Part B --- */
// https://adventofcode.com/2025/day/2#part2

const file = Bun.file('input.txt');
const input = await file.text();

const testInput = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`;

function parseInput(input: string): [number, number][] {
  return input
    .split(',')
    .map((row) => row.split('-').map(Number) as [number, number]);
}

function getDigits(num: number) {
  return Math.floor(Math.log10(num)) + 1;
}

function checkID(num: number) {
  const digits = getDigits(num);
  for (let i = 1; i < digits; i++) {
    const regex = new RegExp(`.{1,${i}}`, 'g'); // Ex. /.{1,2}/g ,/.{1,3}/g ...
    const chunks = num.toString().match(regex); // 1234 -> [1,2,3,4], 1234 -> [12,34] ...

    if (chunks?.every((num) => num === chunks[0])) {
      return true;
    }
  }

  return false;
}

function sumOfIDs(input: string) {
  const invalidIDs = new Set<number>();
  const ranges = parseInput(input);
  for (const [low, high] of ranges) {
    for (let num = low; num <= high; num++) {
      if (checkID(num)) {
        invalidIDs.add(num);
      }
    }
  }

  return invalidIDs.values().reduce((acc, cur) => acc + cur, 0);
}

console.log('Sum of all invalid IDs: ', sumOfIDs(input)); // Sum of all invalid IDs: 41662374059
