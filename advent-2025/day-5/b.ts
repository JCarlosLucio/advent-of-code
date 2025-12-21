/* --- Day 5: Cafeteria --- Part B --- */
// https://adventofcode.com/2025/day/5#part2

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

function parseInput(input: string): [number, number][] {
  const [ranges] = input.split('\n\n').map((row) => row.split('\n'));
  return ranges.map((row) => row.split('-')).map((row) => row.map(Number)) as [
    number,
    number
  ][];
}

function mergeRanges(ranges: [number, number][]): [number, number][] {
  ranges.sort((a, b) => a[0] - b[0]);
  const merged: [number, number][] = [ranges[0]];

  for (const [start, end] of ranges.slice(1)) {
    const last = merged.at(-1)!;
    const lastEnd = last[1];

    if (start <= lastEnd) {
      last[1] = Math.max(lastEnd, end);
    } else {
      merged.push([start, end]);
    }
  }

  return merged;
}

function countFreshIngredients(input: string): number {
  const ranges = parseInput(input);
  const merged = mergeRanges(ranges);

  return merged.reduce((acc, [start, end]) => acc + end - start + 1, 0);
}

console.log('All fresh ingredients count: ', countFreshIngredients(input)); // All fresh ingredients count: 352340558684863
