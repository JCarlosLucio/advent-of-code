/* --- Day 4: ########## --- Part B --- */
// https://adventofcode.com/2024/day/4#part2

const file = Bun.file('input.txt');
const input = await file.text();

const testInput = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

function parseInput(input: string): string[][] {
  return input.split('\n').map((row) => row.split(''));
}

function countX_MAS(x: number, y: number, grid: string[][]): number {
  const directions = [
    [
      [1, -1], // ↙️
      [-1, 1], // ↗️
    ],
    [
      [-1, -1], // ↖️
      [1, 1], // ↘️
    ],
  ];

  const words: string[] = [];
  for (const direction of directions) {
    let word = '';
    for (const [xd, yd] of direction) {
      const letter = grid[y + yd]?.[x + xd];
      if (!letter || letter === 'X' || letter === 'A') {
        break;
      }
      word += letter;
    }
    if (word !== 'MS' && word !== 'SM') {
      break;
    }
    words.push(word);
  }

  return words.length === 2 ? 1 : 0;
}

function getX_MASCount(input: string): number {
  const grid = parseInput(input);
  let count = 0;

  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];
    for (let x = 0; x < row.length; x++) {
      const letter = row[x];
      if (letter === 'A') {
        count += countX_MAS(x, y, grid);
      }
    }
  }

  return count;
}

console.log('Times X-MAS appears: ', getX_MASCount(input)); // Times X-MAS appears: 1912
