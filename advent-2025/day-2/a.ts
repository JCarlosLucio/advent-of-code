/* --- Day 2: Gift Shop --- Part A --- */
// https://adventofcode.com/2025/day/2

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

function getHalf(num: number) {
  const halfDig = Math.floor(getDigits(num) / 2);
  return Math.floor(num / Math.pow(10, halfDig));
}

function isEven(num: number) {
  return num % 2 === 0;
}

function getRanges(low: number, high: number): [number, number][] {
  const ranges: [number, number][] = [];
  const lowDigits = getDigits(low);
  const highDigits = getDigits(high);

  if (isEven(lowDigits)) {
    const lowHalf = getHalf(low);
    const lowHalfDigits = getDigits(lowHalf);
    ranges.push([lowHalf, Math.pow(10, lowHalfDigits) - 1]);
  }

  if (isEven(highDigits)) {
    const highHalf = getHalf(high);
    const highHalfDigits = getDigits(highHalf);
    ranges.push([Math.pow(10, highHalfDigits - 1), highHalf]);
  }

  return ranges;
}

function repeatNum(num: number) {
  const digits = getDigits(num);
  return num * Math.pow(10, digits) + num;
}

function generateIDs(low: number, high: number, ids: Set<number>) {
  const ranges = getRanges(low, high);

  for (const range of ranges) {
    const [start, end] = range;

    for (let i = start; i <= end; i++) {
      const repeated = repeatNum(i);
      if (repeated > high) {
        break;
      }
      if (repeated >= low) {
        ids.add(repeated);
      }
    }
  }
}

function sumOfIDs(input: string) {
  const invalidIDs = new Set<number>();
  const ranges = parseInput(input);
  for (const [low, high] of ranges) {
    generateIDs(low, high, invalidIDs);
  }
  return invalidIDs.values().reduce((acc, cur) => acc + cur, 0);
}

console.log('Sum of all invalid IDs: ', sumOfIDs(input)); // Sum of all invalid IDs: 31839939622
