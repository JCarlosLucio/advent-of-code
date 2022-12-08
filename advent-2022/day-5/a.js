/* --- Day 5: Supply Stacks --- Part A --- */
// https://adventofcode.com/2022/day/5

const fs = require('fs');
const contents = fs.readFileSync('input.txt', 'utf8');

const input = contents.split('\n\n');

const stacks = input[0]
  .split('\n')
  .slice(0, -1)
  .reverse()
  .reduce((acc, curr) => {
    // extract only crates(letters/blanks) into stack rows
    const stackRows = [];
    for (let i = 1; i < curr.length; i += 4) {
      stackRows.push(curr[i]);
    }

    // arrange all row stacks by column
    for (let i = 0; i < stackRows.length; i++) {
      const crate = stackRows[i];
      if (crate !== ' ') {
        if (acc[i]) {
          acc[i].push(crate);
        } else {
          acc[i] = [crate];
        }
      }
    }

    return acc;
  }, []);

const instructions = input[1].split('\n').map((instruction) => {
  const [, moves, , from, , to] = instruction.split(' ');
  return {
    moves: Number(moves),
    from: Number(from) - 1,
    to: Number(to) - 1,
  };
});

// rearrangement procedure
for (const instruction of instructions) {
  let { moves, from, to } = instruction;
  while (moves > 0) {
    const removed = stacks[from].pop();
    stacks[to].push(removed);
    moves--;
  }
}

const topOfStacks = stacks.map((stack) => stack.at(-1)).join('');

console.log('Top of stacks: ', topOfStacks); // Top of stacks: PSNRGBTFT
