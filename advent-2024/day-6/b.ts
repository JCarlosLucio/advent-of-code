/* --- Day 6: Guard Gallivant --- Part B --- */
// https://adventofcode.com/2024/day/6#part2

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

function getPath(input: string): number[][] {
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
  const path: number[][] = [];

  while (cell) {
    if (grid[y][x] !== 'X' && grid[y][x] !== '^') {
      path.push([x, y]);
    }
    grid[y][x] = 'X';
    let nextX = x + directions[dir][1];
    let nextY = y + directions[dir][0];
    let nextCell = grid[nextY]?.[nextX];

    if (nextCell === '#') {
      dir = (dir + 1) % 4;
      nextX = x + directions[dir][1];
      nextY = y + directions[dir][0];
      nextCell = grid[nextY]?.[nextX];
    }
    x = nextX;
    y = nextY;
    cell = nextCell;
  }

  return path;
}

function findLoop(cells: string[]) {
  if (cells.length < 2) {
    return false;
  }
  let loop = 0;

  let tort = 0;
  let hare = 1;
  while (cells.length > tort) {
    tort++;
    hare = 2 * tort;
    const tortC = cells[tort];
    const hareC = cells[hare];

    if (!hareC) {
      return false;
    }

    if (tortC === hareC) {
      loop++;
    }
    if (loop === 3) {
      return true;
    }
  }
  return false;
}

function countLoops(input: string): number {
  const directions = [
    [-1, 0], // ⬆️
    [0, 1], // ➡️
    [1, 0], // ⬇️
    [0, -1], // ⬅️
  ];

  const path = getPath(input);
  const grid = parseInput(input);
  const [x0, y0] = findOrigin(grid);
  let loops = 0;

  for (let i = 0; i < path.length; i++) {
    const lastObstacle = path[i - 1];
    const obstacle = path[i];

    if (lastObstacle) {
      grid[lastObstacle[1]][lastObstacle[0]] = '.';
    }
    // place obstacle
    grid[obstacle[1]][obstacle[0]] = '#';

    let dir = 0;
    let x = x0;
    let y = y0;
    let cell = grid[y]?.[x];
    const cells: string[] = [];

    while (cell) {
      let nextX = x + directions[dir][1];
      let nextY = y + directions[dir][0];
      let nextCell = grid[nextY]?.[nextX];

      while (nextCell === '#') {
        dir = (dir + 1) % 4;
        nextX = x + directions[dir][1];
        nextY = y + directions[dir][0];
        nextCell = grid[nextY]?.[nextX];
      }
      x = nextX;
      y = nextY;
      cell = nextCell;
      cells.push(`${x},${y}`);
      if (findLoop(cells)) {
        loops++;
        break;
      }
    }
  }

  return loops;
}

console.log('# of loops: ', countLoops(input)); // # of loops: 1928
