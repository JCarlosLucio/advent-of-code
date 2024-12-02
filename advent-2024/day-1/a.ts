/* --- Day 1: Historian Hysteria --- Part A --- */
// https://adventofcode.com/2024/day/1

const file = Bun.file('input.txt');
const input = await file.text();

const testInput = `3   4
4   3
2   5
1   3
3   9
3   3`;

function parseInput(input: string): number[][] {
  return input
    .split('\n')
    .map((row) => row.split('   ').map(Number))
    .reduce<number[][]>(
      (acc, cur) => {
        acc[0].push(cur[0]);
        acc[1].push(cur[1]);

        return acc;
      },
      [[], []]
    );
}

function calculateDistance(input: string): number {
  const [left, right] = parseInput(input);
  left.sort((a, b) => a - b);
  right.sort((a, b) => a - b);

  let sum = 0;
  for (let i = 0; i < left.length; i++) {
    sum += Math.abs(left[i] - right[i]);
  }

  return sum;
}

console.log('Total distance between your lists: ', calculateDistance(input)); // Total distance between your lists: 2264607
