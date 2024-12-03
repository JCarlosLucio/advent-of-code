/* --- Day 3: Mull It Over --- Part B --- */
// https://adventofcode.com/2024/day/3#part2

const file = Bun.file('input.txt');
const input = await file.text();

const testInput =
  "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

function parseInput(input: string): (string | number[])[] {
  /**
   * match "mul(*digits*,*digits*)"
   *  - 1st group: "mul(*digits*,*digits*)" or "do()" or "don't()"
   *  - 2nd group: "*digits*,*digits*" or undefined
   *  ex. [ "mul(2,4)", "2,4", index: 1, input: ""xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"", groups: undefined ]
   *  ex. [ "don't()", undefined, index: 20, input: "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))",
    groups: undefined ],
   */
  const regex = /mul\((\d+,\d+)\)|do\(\)|don't\(\)/gm;
  const matches = input.matchAll(regex).toArray();

  return matches.map((match) => {
    if (!match[1]) {
      return match[0];
    }
    return match[1].split(',').map(Number);
  }); // [ 2, 4 ], "don't()", [ 5, 5 ], [ 11, 8 ], "do()", [ 8, 5 ]
}

function sumMuls(input: string) {
  const muls = parseInput(input);
  let active = true;
  let sum = 0;
  for (const mul of muls) {
    if (Array.isArray(mul)) {
      if (active) {
        sum += mul[0] * mul[1];
      }
    } else {
      active = mul === 'do()';
    }
  }

  return sum;
}

console.log('Sum of multiplications: ', sumMuls(input)); // Sum of multiplications:  63866497
