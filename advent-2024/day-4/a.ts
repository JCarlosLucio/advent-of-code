/* --- Day 4: ########## --- Part A --- */
// https://adventofcode.com/2024/day/4

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

function getWordCount(x: number, y: number, grid: string[][]): number {
  const directions = [
    [
      [-1, 0],
      [-2, 0],
      [-3, 0],
    ], // ⬆️
    [
      [-1, 1],
      [-2, 2],
      [-3, 3],
    ], // ↗️
    [
      [0, 1],
      [0, 2],
      [0, 3],
    ], // ➡️
    [
      [1, 1],
      [2, 2],
      [3, 3],
    ], // ↘️
    [
      [1, 0],
      [2, 0],
      [3, 0],
    ], // ⬇️
    [
      [1, -1],
      [2, -2],
      [3, -3],
    ], // ↙️
    [
      [0, -1],
      [0, -2],
      [0, -3],
    ], // ⬅️
    [
      [-1, -1],
      [-2, -2],
      [-3, -3],
    ], // ↖️
  ];

  let count = 0;

  for (const direction of directions) {
    let word = '';
    for (const [xd, yd] of direction) {
      const letter = grid[y + yd]?.[x + xd];
      if (!letter) {
        break;
      }
      word += letter;
    }
    if (word === 'MAS') {
      count++;
    }
  }

  return count;
}

function getXMASCount(input: string): number {
  const grid = parseInput(input);
  let count = 0;

  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];
    for (let x = 0; x < row.length; x++) {
      const letter = row[x];
      if (letter === 'X') {
        count += getWordCount(x, y, grid);
      }
    }
  }

  return count;
}

console.log('Times XMAS appears: ', getXMASCount(input)); // Times XMAS appears: 2521
