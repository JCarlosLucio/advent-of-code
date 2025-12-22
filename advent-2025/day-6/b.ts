/* --- Day 6: Trash Compactor --- Part B --- */
// https://adventofcode.com/2025/day/6#part2

const file = Bun.file('input.txt');
const input = await file.text();

const testInput = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;

function parseInput(input: string): [number[], '*' | '+'][] {
  const rows = input.split('\n');

  const problems: [number[], '*' | '+'][] = [];
  for (let i = 0; i < rows[0].length; i++) {
    let num = '';
    for (let j = 0; j < rows.length; j++) {
      const el = rows[j][i];
      if (el === ' ') {
        continue;
      }
      if (el === '+' || el === '*') {
        problems.push([[], el]);
        continue;
      }
      num += el;
    }

    if (num === '') {
      continue;
    }

    const [nums] = problems.at(-1)!;
    nums.push(Number(num));
  }

  return problems;
}

function grandTotal(input: string) {
  const problems = parseInput(input);
  const ops = {
    '*': [(a: number, b: number) => a * b, 1],
    '+': [(a: number, b: number) => a + b, 0],
  } as const;

  let total = 0;
  for (const [nums, op] of problems) {
    const subtotal = nums.reduce((a, c) => ops[op][0](a, c), ops[op][1]);
    total += subtotal;
  }

  return total;
}

console.log('Grand total: ', grandTotal(input)); // Grand total: 10194584711842
