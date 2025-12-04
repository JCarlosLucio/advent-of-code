/* --- Day 1: Secret Entrance --- Part A --- */
// https://adventofcode.com/2025/day/1

const file = Bun.file('input.txt');
const input = await file.text();

const testInput = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;

function parseInput(input: string): number[] {
  return input
    .split('\n')
    .map((row) => (row[0] === 'L' ? -1 : 1) * Number(row.slice(1)));
}

function rotateDial(start: number, rotation: number): number {
  start = start + (rotation % 100);

  start = start % 100;

  if (start < 0) {
    start += 100;
  }

  return start;
}

function getPassword(input: string): number {
  let dial = 50;
  let count = 0;

  const rotations = parseInput(input);
  for (const rotation of rotations) {
    dial = rotateDial(dial, rotation);
    if (dial === 0) {
      count++;
    }
  }

  return count;
}

console.log('Password: ', getPassword(input)); // Password: 992
