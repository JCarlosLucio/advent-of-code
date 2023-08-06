/* --- Day 11: Monkey in the Middle --- Part A --- */
// https://adventofcode.com/2022/day/11

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
    test: Number(actions[3].split('by ')[1]),
    result: {
      true: Number(actions[4].at(-1)), // 4
      false: Number(actions[5].at(-1)), // 1
    },
    inspected: 0,
  };
};

const monkeyBusiness = (data) => {
  const monkeys = data.split('\n\n').map((monkey) => parseMonkey(monkey));

  // loop through monkeys 20 times
  for (let i = 0; i < 20; i++) {
    for (const monkey of monkeys) {
      // loop items
      while (monkey.items.length > 0) {
        let item = monkey.items.shift(); // grab item

        item = monkey.operation(item); // monkey inspect

        item = Math.floor(item / 3); // monkey bored

        const id = monkey.result[item % monkey.test === 0]; // test worry lvl

        monkeys[id].items.push(item); // throw item to monkey

        monkey.inspected++;
      }
    }
  }

  const sorted = monkeys.sort((a, b) => b.inspected - a.inspected);

  return sorted[0].inspected * sorted[1].inspected;
};

console.log('Level of monkey business: ', monkeyBusiness(input)); // Level of monkey business: 64032
