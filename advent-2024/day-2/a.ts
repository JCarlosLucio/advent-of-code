/* --- Day 2: Red-Nosed Reports --- Part A --- */
// https://adventofcode.com/2024/day/2

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

function safeReports(input: string): number {
  const reports = parseInput(input);

  let sum = 0;
  for (const report of reports) {
    if (isSafe(report)) {
      sum++;
    }
  }
  return sum;
}

console.log('Safe reports: ', safeReports(input)); // Safe reports: 269
