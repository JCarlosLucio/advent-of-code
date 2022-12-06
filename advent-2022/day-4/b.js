const fs = require('fs');
const contents = fs.readFileSync('input.txt', 'utf8');

const totalPartialOverlaps = contents
  .split('\n')
  .map((p) => p.split(',').map((p) => p.split('-').map((p) => Number(p)))) // [  [  [ 35, 73 ], [ 35, 82 ]  ], [  [ 9, 27 ], [ 10, 80 ]  ], ...]
  .filter((pair) => {
    const [[fStart, fEnd], [sStart, sEnd]] = pair;

    // partial overlaps
    return (
      (fStart <= sStart && sStart <= fEnd) ||
      (sStart <= fStart && fStart <= sEnd)
    );
  }).length;

console.log('Total overlaps: ', totalPartialOverlaps); // Total overlaps: 507
