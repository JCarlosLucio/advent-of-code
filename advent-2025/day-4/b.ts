/* --- Day 4: Printing Department --- Part B --- */
// https://adventofcode.com/2025/day/4#part2

const file = Bun.file('input.txt');
const input = await file.text();

const testInput = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;

function parseInput(input: string) {
  return input.split('\n').map((row) => row.split(''));
}

function isAccessible(grid: string[][], r: number, c: number) {
  const MAX_ADJACENT = 4;
  const directions: [number, number][] = [
    [-1, 0], // up
    [-1, 1], // up-right
    [0, 1], // right
    [1, 1], // down-right
    [1, 0], // down
    [1, -1], // down-left
    [0, -1], // left
    [-1, -1], // up-left
  ];

  let count = 0;
  for (const [dr, dc] of directions) {
    const [nr, nc] = [r + dr, c + dc];
    const node = grid?.[nr]?.[nc];

    if (node === '@') {
      count++;
    }
    if (count >= MAX_ADJACENT) {
      return false;
    }
  }

  return true;
}

function accessibleRolls(input: string): number {
  const diagram = parseInput(input);
  const ROWS = diagram.length;
  const COLS = diagram[0].length;

  let rolls = 0;
  let toRemove: [number, number][] = [];
  do {
    for (const [r, c] of toRemove) {
      diagram[r][c] = 'x';
    }
    toRemove = [];

    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        const node = diagram[i][j];
        if (node !== '@') {
          continue;
        }
        if (isAccessible(diagram, i, j)) {
          toRemove.push([i, j]);
          rolls++;
        }
      }
    }
  } while (toRemove.length > 0);

  return rolls;
}

console.log('Accessible rolls count: ', accessibleRolls(input)); // Accessible rolls count: 9290
