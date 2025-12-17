/* --- Day 3: Lobby --- Part A --- */
// https://adventofcode.com/2025/day/3

const file = Bun.file('input.txt');
const input = await file.text();

const testInput = `987654321111111
811111111111119
234234234234278
818181911112111`;

function parseInput(input: string): number[][] {
  return input.split('\n').map((row) => row.split('').map(Number));
}

function getTotalJoltage(input: string): number {
  const joltages: number[] = [];
  const ratings = parseInput(input);

  for (const rating of ratings) {
    const firstMax = Math.max(...rating.slice(0, -1));
    const secondMax = Math.max(...rating.slice(rating.indexOf(firstMax) + 1));

    joltages.push(firstMax * 10 + secondMax);
  }

  return joltages.reduce((a, c) => a + c, 0);
}

console.log('Total output joltage: ', getTotalJoltage(input)); // Total output joltage: 17301
