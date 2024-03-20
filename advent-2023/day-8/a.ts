/* --- Day 8: Haunted Wasteland --- Part A --- */
// https://adventofcode.com/2023/day/8

const file = Bun.file('input.txt');
const input = await file.text();

// const testInput = `RL

// AAA = (BBB, CCC)
// BBB = (DDD, EEE)
// CCC = (ZZZ, GGG)
// DDD = (DDD, DDD)
// EEE = (EEE, EEE)
// GGG = (GGG, GGG)
// ZZZ = (ZZZ, ZZZ)`;

const testInput = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;

const parseInput = (input: string) => {
  const [instructions, nodesStr] = input.split('\n\n');

  const nodes = nodesStr
    .split('\n')
    .reduce<Record<string, Record<string, string>>>((acc, curr) => {
      const [prop, val] = curr.split(' = ');
      const vals: string[] = val.slice(1, -1).split(', ');

      const nodeValues: Record<string, string> = {
        L: vals[0],
        R: vals[1],
      };

      acc[prop] = nodeValues;
      return acc;
    }, {});

  return { instructions, nodes };
};

const countSteps = (input: string): number => {
  const { instructions, nodes } = parseInput(input);
  let list = instructions;
  let step = 0;
  let lastNode = 'AAA';

  while (lastNode !== 'ZZZ') {
    if (!instructions[step + 1]) {
      list = list + instructions;
    }

    const instruction = list[step]; // L or R
    const node = nodes[lastNode][instruction];

    lastNode = node;
    step++;
  }

  return step;
};

console.log('Total steps required to reach ZZZ: ', countSteps(input)); // Total steps required to reach ZZZ: 14893
