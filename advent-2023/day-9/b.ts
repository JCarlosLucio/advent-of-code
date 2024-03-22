/* --- Day 9: Mirage Maintenance --- Part B --- */
// https://adventofcode.com/2023/day/9#part2

const file = Bun.file('input.txt');
const input = await file.text();

const testInput = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

const parseInput = (input: string) => {
  return input.split('\n').map((row) => row.split(' ').map(Number));
};

const getDiffs = (nums: number[]): number[][] => {
  if (nums.every((n) => !n)) return [];

  const diff: number[] = [];

  for (let i = 0; i < nums.length - 1; i++) {
    diff.push(nums[i + 1] - nums[i]);
  }

  return [nums, ...getDiffs(diff)];
};

const extrapolateBack = (row: number[]) => {
  const diffs: number[][] = getDiffs(row);

  return diffs.reduceRight<number>((acc, cur) => (cur[0] ?? 0) - acc, 0);
};

const sumExtrapolations = (input: string) => {
  const values = parseInput(input);

  return values.reduce<number>((acc, cur) => acc + extrapolateBack(cur), 0);
};

console.log('Total sum extrapolated values: ', sumExtrapolations(input)); // Total sum extrapolated values: 1053
