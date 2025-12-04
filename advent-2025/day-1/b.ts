/* --- Day 1: Secret Entrance --- Part B --- */
// https://adventofcode.com/2025/day/1#part2

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

function rotateDial(start: number, rotation: number): [number, number] {
  let extra = Math.floor(Math.abs(rotation) / 100);
  const wasZero = start === 0 ? 0 : 1;

  start = start + (rotation % 100);

  if (start > 100) {
    extra += wasZero;
  }
  if (start < 0) {
    extra += wasZero;
    start += 100;
  }

  start = start % 100;

  return [start, extra];
}

function getPassword(input: string): number {
  let dial = 50;
  let count = 0;

  const rotations = parseInput(input);
  for (const rotation of rotations) {
    let [newDial, extra] = rotateDial(dial, rotation);
    dial = newDial;
    count += extra;
    if (dial === 0) {
      count++;
    }
  }

  return count;
}

console.log('Password: ', getPassword(input)); // Password: 6133
