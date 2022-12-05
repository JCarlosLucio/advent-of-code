const fs = require('fs');
const contents = fs.readFileSync('input.txt', 'utf8');

const getPriority = (letter) => {
  const charCode = letter.charCodeAt(0);

  if (charCode > 96) return charCode - 96;

  return charCode - 65 + 27;
};

const total = contents.split('\n').reduce(
  (acc, curr) => {
    acc.group.push(curr);
    if (acc.group.length === 3) {
      const {
        sum,
        group: [first, second, third],
      } = acc;
      const badge = [...first].find(
        (item) => second.includes(item) && third.includes(item)
      );
      return { sum: sum + getPriority(badge), group: [] };
    }

    return acc;
  },
  { sum: 0, group: [] }
).sum;

console.log('Total priorities: ', total); // Total priorities:  2752
