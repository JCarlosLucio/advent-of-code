/* --- Day 11: Monkey in the Middle --- Part B --- */
// https://adventofcode.com/2022/day/11#part2

const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

const getOperation = ([op, val]) => {
  if (op === '*') {
    return (old) => old * (val === 'old' ? old : Number(val));
  }
  if (op === '+') {
    return (old) => old + (val === 'old' ? old : Number(val));
  }
};

const parseMonkey = (monkey) => {
  const actions = monkey.split('\n');

  return {
    id: Number(actions[0].at(-2)), // 1
    items: actions[1]
      .split(':')[1]
      .split(',')
      .map((n) => Number(n)), // [83, 88, 96, ...]
    operation: getOperation(actions[2].split('= old ')[1].split(' ')), // (old) => old * 11
    test: Number(actions[3].split('by ')[1]), // 11
    result: {
      true: Number(actions[4].at(-1)), // 4
      false: Number(actions[5].at(-1)), // 1
    },
    inspected: 0,
  };
};

const monkeyBusiness2 = (data) => {
  const monkeys = data.split('\n\n').map((monkey) => parseMonkey(monkey));

  // loop through monkeys 10000 times
  const loops = 10000;
  const divider = monkeys.reduce((a, c) => a * c.test, 1); // multiply every divisible by test

  for (let i = 0; i < loops; i++) {
    for (const monkey of monkeys) {
      while (monkey.items.length > 0) {
        let item = monkey.items.shift(); // grab item

        item = monkey.operation(item); // monkey inspect

        item %= divider; // manage worry

        const id = monkey.result[item % monkey.test === 0]; // test worry lvl

        monkeys[id].items.push(item); // throw item to monkey

        monkey.inspected++;
      }
    }
  }

  const sorted = monkeys.sort((a, b) => b.inspected - a.inspected);

  return sorted[0].inspected * sorted[1].inspected;
};

console.log('Level of monkey business: ', monkeyBusiness2(input)); // Level of monkey business: 12729522272
