/* --- Day 7: Bridge Repair --- Part A --- */
// https://adventofcode.com/2024/day/7

const file = Bun.file('input.txt');
const input = await file.text();

const testInput = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

function parseInput(input: string): Map<number, number[]> {
  return input.split('\n').reduce((acc, cur) => {
    const row = cur.split(':');
    acc.set(Number(row[0]), row[1].trim().split(' ').map(Number));
    return acc;
  }, new Map<number, number[]>());
}

function combinations(ops: string[], r: number) {
  if (r < 1) {
    return ops;
  }

  const result: string[] = [];
  for (const op of ops) {
    for (const rec of combinations(ops, r - 1)) {
      result.push(op + rec);
    }
  }

  return result;
}

function canBeSolved(res: number, eq: number[], memo: Map<number, string[]>) {
  const ops: Record<string, (n1: number, n2: number) => number> = {
    '+': (n1: number, n2: number) => n1 + n2,
    '*': (n1: number, n2: number) => n1 * n2,
  };
  const len = eq.length - 2;
  const combs = memo.get(len) ?? combinations(['+', '*'], len);
  if (!memo.has(len)) {
    memo.set(len, combs);
  }

  for (const comb of combs) {
    let start = ops[comb[0]](eq[0], eq[1]);
    let result = start;
    for (let i = 2; i < eq.length; i++) {
      const cur = eq[i];
      const op = ops[comb[i - 1]];
      result = op(result, cur);
      if (result > res) {
        break;
      }
    }

    if (result === res) {
      return true;
    }
  }

  return false;
}

function totalCalibration(input: string) {
  const memo = new Map<number, string[]>();
  const eqsMap = parseInput(input);
  const eqs = eqsMap.entries();
  let total = 0;

  for (const [res, eq] of eqs) {
    if (canBeSolved(res, eq, memo)) {
      total += res;
    }
  }
  return total;
}
console.log('Total calibration: ', totalCalibration(input)); // Total calibration:  7710205485870
