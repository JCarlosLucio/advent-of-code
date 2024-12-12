/* --- Day 8: Resonant Collinearity --- Part A --- */
// https://adventofcode.com/2024/day/8

const file = Bun.file('input.txt');
const input = await file.text();

const testInput = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;

function parseInput(input: string) {
  return input.split('\n').map((row) => row.split(''));
}

function findAntennas(grid: string[][]): Map<string, number[][]> {
  const antennas = new Map<string, number[][]>();

  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];
    for (let x = 0; x < row.length; x++) {
      const cell = row[x];
      if (cell !== '.') {
        const coords = antennas.get(cell);
        if (coords) {
          coords.push([x, y]);
        } else {
          antennas.set(cell, [[x, y]]);
        }
      }
    }
  }

  return antennas;
}

function findAntinode(antenna1: number[], antenna2: number[]): number[] {
  const dy = antenna2[1] - antenna1[1];
  const dx = antenna2[0] - antenna1[0];

  return [antenna1[1] - dy, antenna1[0] - dx];
}

function findUniqueAntinodes(input: string): number {
  const grid = parseInput(input);
  const antennasMap = findAntennas(grid);
  const antinodes = new Set<string>();

  for (const antennas of antennasMap.values()) {
    for (const antenna1 of antennas) {
      for (const antenna2 of antennas) {
        if (antenna1 !== antenna2) {
          const [x, y] = findAntinode(antenna1, antenna2);
          if (grid[y]?.[x]) {
            antinodes.add(`${x},${y}`);
          }
        }
      }
    }
  }

  return antinodes.size;
}

console.log('Unique antinodes: ', findUniqueAntinodes(input)); // Unique antinodes:  376
