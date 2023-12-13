/* --- Day 3: Gear Ratios --- Part A --- */
// https://adventofcode.com/2023/day/3

const file = Bun.file('input.txt');
const input = await file.text();

const testInput = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
........*5
.12.......`;

const getAdjacents = (
  x: number,
  y: number,
  grid: (string | number)[][]
): (string | number)[] => {
  // [x - 1, y - 1]    [x, y - 1]    [x + 1, y - 1]
  // [x - 1, y]         [x, y]       [x + 1, y]
  // [x - 1, y + 1]    [x, y + 1]    [x + 1, y + 1]
  return [
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
  ].map(([xd, yd]) => grid[y + yd]?.[x + xd]);
};

const isSymbol = (val: string | number | undefined): boolean => {
  return !(val === '.' || val === undefined || Number.isInteger(Number(val)));
};

const sumParts = (input: string) => {
  const grid = input.split('\n').map((r) =>
    r.split('').map((c) => {
      const num = Number(c);
      return Number.isInteger(num) ? num : c;
    })
  );

  let total = 0;

  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];
    let numStr = '';
    let adjacentToSymbol = false;

    for (let x = 0; x < row.length; x++) {
      const cell = row[x];

      if (Number.isInteger(cell)) {
        numStr += cell;
        // check if any adjacent cells have symbols
        const adjacents = getAdjacents(x, y, grid);
        const hasSymbols = adjacents.some(isSymbol);
        if (hasSymbols) {
          adjacentToSymbol = hasSymbols;
        }
        console.log(cell, adjacents, hasSymbols);
      }

      // checks when cell changes to non-number or end of the line
      if (!Number.isInteger(cell) || x === row.length - 1) {
        if (numStr && adjacentToSymbol) {
          total += Number(numStr);
          console.log(numStr, total);
        }
        numStr = '';
        adjacentToSymbol = false;
      }
    }
  }
  return total;
};

console.log('The sum of all the part numbers in the engine: ', sumParts(input)); // Total: 507214
