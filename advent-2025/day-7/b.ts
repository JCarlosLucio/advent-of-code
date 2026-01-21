/* --- Day 7: Laboratories --- Part B --- */
// https://adventofcode.com/2025/day/7#part2

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

function sumGridStrNum(cell: string, above: string) {
  if (above === 'S') {
    above = '1';
  }
  return ((Number(cell) || 0) + Number(above)).toString();
}

function tachyonsTimelines(input: string) {
  const grid = parseInput(input);
  const ROWS = grid.length;
  const COLS = grid[0].length;

  for (let r = 1; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = grid[r][c];
      const above = grid[r - 1][c];

      if (above !== '.' && above !== '^') {
        if (cell === '^') {
          grid[r][c - 1] = sumGridStrNum(grid[r][c - 1], above);
          grid[r][c + 1] = sumGridStrNum(grid[r][c + 1], above);
          continue;
        }

        grid[r][c] = sumGridStrNum(grid[r][c], above);
      }
    }
  }
  // console.table(grid);

  return grid.at(-1)?.reduce((a, c) => a + (Number(c) || 0), 0);
}

console.log('Tachyons timelines: ', tachyonsTimelines(input)); // Tachyons timelines: 171692855075500
