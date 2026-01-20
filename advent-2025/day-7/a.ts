/* --- Day 7: Laboratories --- Part A --- */
// https://adventofcode.com/2025/day/7

const file = Bun.file('input.txt');
const input = await file.text();

const testInput = `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`;

function parseInput(input: string) {
  return input.split('\n').map((row) => row.split(''));
}

function timesBeamSplit(input: string) {
  let times = 0;
  const grid = parseInput(input);

  const ROWS = grid.length;
  const COLS = grid[0].length;

  for (let r = 1; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = grid[r][c];
      const above = grid[r - 1][c];
      if (above === '|' || above === 'S') {
        if (cell === '^') {
          grid[r][c - 1] = '|';
          grid[r][c + 1] = '|';
          times++;
          continue;
        }

        grid[r][c] = '|';
      }
    }
  }

  return times;
}

console.log('Times the beam split: ', timesBeamSplit(input)); // Times the beam split: 1703
