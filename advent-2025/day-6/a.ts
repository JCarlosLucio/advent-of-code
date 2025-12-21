/* --- Day 6: Trash Compactor --- Part A --- */
// https://adventofcode.com/2025/day/6

const file = Bun.file('input.txt');
const input = await file.text();

const testInput = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;

function parseInput(input: string) {
  const rows = input
    .split('\n')
    .map((row) => row.split(/(\s+)/).filter((e) => e.trim().length > 0));

  const cols: string[][] = [];
  for (let i = 0; i < rows[0].length; i++) {
    for (let j = 0; j < rows.length; j++) {
      const col = cols[i];
      if (col) {
        col.push(rows[j][i]);
      } else {
        cols[i] = [rows[j][i]];
      }
    }
  }

  const problems: [number[], '*' | '+'][] = [];
  for (const col of cols) {
    problems.push([col.slice(0, -1).map(Number), col.at(-1) as '*' | '+']);
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

console.log('Grand total: ', grandTotal(input)); // Grand total: 5782351442566
