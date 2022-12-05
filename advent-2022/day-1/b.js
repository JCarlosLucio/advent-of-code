const fs = require('fs');
const contents = fs.readFileSync('input.txt', 'utf8');

const [top1, top2, top3] = contents
  .split('\n\n')
  .map((elf) => elf.split('\n').reduce((acc, curr) => acc + Number(curr), 0))
  .sort((a, b) => b - a);

const totalTopThree = top1 + top2 + top3;

console.log('Top 3 total: ', totalTopThree); // 195292
