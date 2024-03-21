/* --- Day 8: Haunted Wasteland --- Part B --- */
// https://adventofcode.com/2023/day/8#part2

const file = Bun.file('input.txt');
const input = await file.text();

const testInput = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;

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

const countSteps = (input: string, startNode: string): number => {
  const { instructions, nodes } = parseInput(input);
  let list = instructions;
  let step = 0;
  let lastNode = startNode;

  while (lastNode[2] !== 'Z') {
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

const lcm = (nums: number[]): number => {
  return nums.reduce((acc, cur) => (acc * cur) / gcd(acc, cur));
};

const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};

const getStepsLCM = (input: string) => {
  const { nodes } = parseInput(input);
  const startNodes = Object.keys(nodes).filter((node) => node[2] === 'A');
  const steps = startNodes.map((node) => countSteps(input, node));

  return lcm(steps);
};

console.log(
  'Total steps before there are only on nodes that end with Z: ',
  getStepsLCM(input)
); // Total steps before there are only on nodes that end with Z: 10241191004509
