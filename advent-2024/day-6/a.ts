/* --- Day 6: Guard Gallivant --- Part A --- */
// https://adventofcode.com/2024/day/6

const file = Bun.file('input.txt');
const input = await file.text();

const testInput = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

function parseInput(input: string): string[][] {
  return input.split('\n').map((row) => row.split(''));
}

function findOrigin(grid: string[][]): number[] {
  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];
    const x = row.indexOf('^');
    if (x !== -1) {
      return [x, y];
    }
  }
  return [];
}

function countPositions(input: string): number {
  const grid = parseInput(input);

  const directions = [
    [-1, 0], // ⬆️
    [0, 1], // ➡️
    [1, 0], // ⬇️
    [0, -1], // ⬅️
  ];

  const [x0, y0] = findOrigin(grid);
  let dir = 0;
  let x = x0;
  let y = y0;
  let cell = grid[y]?.[x];
  let count = 0;

  while (cell) {
    if (grid[y][x] !== 'X') {
      count++;
    }
    grid[y][x] = 'X';
    let nextX = x + directions[dir][1];
    let nextY = y + directions[dir][0];
    let nextCell = grid[nextY]?.[nextX];

    if (nextCell === '#') {
      dir = (dir + 1) % 4;
      nextX = x + directions[dir][1];
      nextY = y + directions[dir][0];
      nextCell = grid[y]?.[x];
    }
    x = nextX;
    y = nextY;
    cell = nextCell;
  }

  return count;
}

console.log('# of positions: ', countPositions(input)); // # of positions: 5030
