/* --- Day 3: Mull It Over --- Part A --- */
// https://adventofcode.com/2024/day/3

const file = Bun.file('input.txt');
const input = await file.text();

const testInput =
  'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))';

function parseInput(input: string): number[][] {
  /**
   * match "mul(*digits*,*digits*)"
   *  - 1st group: "mul(*digits*,*digits*)"
   *  - 2nd group: "*digits*,*digits*"
   *  ex. [ "mul(2,4)", "2,4", index: 1, input: "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))", groups: undefined ]
   */
  const regex = /mul\((\d+,\d+)\)/gm;
  const matches = input.matchAll(regex).toArray();

  return matches.map((m) => m[1].split(',').map(Number)); // [[ 2, 4 ], [ 5, 5 ], [ 11, 8 ], [ 8, 5 ]]
}

function sumMuls(input: string) {
  const muls = parseInput(input);
  return muls.reduce((acc, cur) => acc + cur[0] * cur[1], 0);
}

console.log('Sum of multiplications: ', sumMuls(input)); // Sum of multiplications:  171183089
