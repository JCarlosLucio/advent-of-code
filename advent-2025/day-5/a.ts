/* --- Day 5: Cafeteria --- Part A --- */
// https://adventofcode.com/2025/day/5

const file = Bun.file('input.txt');
const input = await file.text();

const testInput = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;

function parseInput(input: string): [[number, number][], number[]] {
  const [ranges, ids] = input.split('\n\n').map((row) => row.split('\n'));
  return [
    ranges.map((row) => row.split('-')).map((row) => row.map(Number)) as [
      number,
      number
    ][],
    ids.map(Number),
  ];
}

function countFreshIngredients(input: string): number {
  const [ranges, ids] = parseInput(input);
  let count = 0;
  for (const id of ids) {
    if (ranges.some(([low, up]) => id >= low && id <= up)) {
      count++;
    }
  }

  return count;
}

console.log('Fresh ingredients count: ', countFreshIngredients(input)); // Fresh ingredients count: 701
