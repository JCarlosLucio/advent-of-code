/* --- Day 3: Gear Ratios --- Part B --- */
// https://adventofcode.com/2023/day/3#part2

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
.664.598..`;

const getAdjacentStar = (x: number, y: number, grid: (string | number)[][]) => {
  // [x - 1, y - 1]    [x, y - 1]    [x + 1, y - 1]
  // [x - 1, y]         [x, y]       [x + 1, y]
  // [x - 1, y + 1]    [x, y + 1]    [x + 1, y + 1]
  const adjacents = [
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
  ].map(([xd, yd]) => [y + yd, x + xd]);

  for (const [yCurr, xCurr] of adjacents) {
    if (grid[yCurr]?.[xCurr] === '*') {
      return `${yCurr},${xCurr}`;
    }
  }
  return null;
};

const sumGearRatios = (input: string) => {
  const grid = input.split('\n').map((r) =>
    r.split('').map((c) => {
      const num = Number(c);
      return Number.isInteger(num) ? num : c;
    })
  );

  const gears = new Map<string, number[]>();

  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];
    let numStr = '';
    let adjacentStar = '';

    for (let x = 0; x < row.length; x++) {
      const cell = row[x];

      if (Number.isInteger(cell)) {
        numStr += cell;
        // check if any adjacent cells have star
        const starCoord = getAdjacentStar(x, y, grid);
        if (starCoord) {
          adjacentStar = starCoord;
          console.log(starCoord);
        }
      }

      // checks when cell changes to non-number or end of the line
      if (!Number.isInteger(cell) || x === row.length - 1) {
        if (numStr && adjacentStar) {
          const num = Number(numStr);

          // save number in gears map with coords as key. ex. { 'y,x': [number, ...] }
          const currGears = gears.get(adjacentStar);
          gears.set(adjacentStar, currGears ? [...currGears, num] : [num]);

          console.log(numStr, gears);
        }
        numStr = '';
        adjacentStar = '';
      }
    }
  }

  return [...gears.values()].reduce((acc, curr) => {
    if (curr.length === 2) {
      return acc + curr.reduce((a, c) => a * c, 1);
    }
    return acc;
  }, 0);
};

console.log(
  'The sum of all of the gear ratios in the engine: ',
  sumGearRatios(input)
); // Total: 72553319
