/* --- Day 1: Historian Hysteria --- Part B --- */
// https://adventofcode.com/2024/day/1#part2

const file = Bun.file('input.txt');
const input = await file.text();

const testInput = `3   4
4   3
2   5
1   3
3   9
3   3`;

function parseInput(input: string): number[][] {
  return input
    .split('\n')
    .map((row) => row.split('   ').map(Number))
    .reduce<number[][]>(
      (acc, cur) => {
        acc[0].push(cur[0]);
        acc[1].push(cur[1]);

        return acc;
      },
      [[], []]
    );
}

function calculateSimilarityScore(input: string): number {
  const [left, right] = parseInput(input);

  const counts = new Map<number, number>();
  for (const num of right) {
    counts.set(num, (counts.get(num) ?? 0) + 1);
  }

  let score = 0;
  for (const num of left) {
    score += num * (counts.get(num) ?? 0);
  }

  return score;
}

console.log('Similarity score: ', calculateSimilarityScore(input)); // Similarity score: : 19457120
