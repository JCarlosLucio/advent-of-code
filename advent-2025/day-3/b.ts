/* --- Day 3: Lobby --- Part B --- */
// https://adventofcode.com/2025/day/3#part2

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
    let sum = 0;
    let start = 0;
    let end = rating.length - 11;

    for (let i = 0; i < 12; i++) {
      const chunk = rating.slice(start, end);
      const max = Math.max(...chunk);
      start = start + chunk.indexOf(max) + 1;
      end++;
      sum = sum * 10 + max;
    }
    joltages.push(sum);
  }

  return joltages.reduce((a, c) => a + c, 0);
}

console.log('New total output joltage: ', getTotalJoltage(input)); // New total output joltage: 172162399742349
