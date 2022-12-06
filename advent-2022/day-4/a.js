const fs = require('fs');
const contents = fs.readFileSync('input.txt', 'utf8');

const totalOverlaps = contents
  .split('\n')
  .map((p) => p.split(',').map((p) => p.split('-').map((p) => Number(p)))) // [  [  [ 35, 73 ], [ 35, 82 ]  ], [  [ 9, 27 ], [ 10, 80 ]  ], ...]
  .filter((pair) => {
    const [[fStart, fEnd], [sStart, sEnd]] = pair;

    // complete overlaps
    return (
      (fStart <= sStart && fEnd >= sEnd) || (sStart <= fStart && sEnd >= fEnd)
    );
  }).length;

console.log('Total overlaps: ', totalOverlaps); // Total overlaps: 507
