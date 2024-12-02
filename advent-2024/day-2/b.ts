/* --- Day 2: Red-Nosed Reports --- Part B --- */
// https://adventofcode.com/2024/day/2#part2

const file = Bun.file('input.txt');
const input = await file.text();

const testInput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

function parseInput(input: string): number[][] {
  return input.split('\n').map((row) => row.split(' ').map(Number));
}

function isSafe(report: number[]): boolean {
  const isInc = report[0] < report[1];
  for (let i = 0; i < report.length - 1; i++) {
    const cur = report[i];
    const next = report[i + 1];

    const diff = Math.abs(cur - next);
    const isSafeDiff = 0 < diff && diff <= 3;

    if (isInc !== cur < next || cur === next || !isSafeDiff) {
      return false;
    }
  }

  return true;
}

// permutations without 1 level
function makePerms(report: number[]): number[][] {
  return report.map((r, i) => report.filter((_, j) => j !== i));
}

function safeReports(input: string): number {
  const reports: number[][] = parseInput(input);

  let sum = 0;
  for (const report of reports) {
    if (makePerms(report).some(isSafe)) {
      sum++;
    }
  }
  return sum;
}

console.log('Safe reports: ', safeReports(input)); // Safe reports: 337
