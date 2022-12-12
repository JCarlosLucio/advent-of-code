/* --- Day 8: Treetop Tree House --- Part A --- */
// https://adventofcode.com/2022/day/8

const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

const getTreeColumn = (rows, j) =>
  rows.reduce((acc, curr) => [...acc, curr[j]], []);

const calculateVisibleTrees = (data) => {
  const treeMatrix = data
    .split('\n')
    .map((row) => row.split('').map((tree) => Number(tree))); // [[1, 2, 3, ...], [4, 6, 8, ...]]

  let visibleCount = 0;

  for (let i = 0; i < treeMatrix.length; i++) {
    const row = treeMatrix[i];
    for (let j = 0; j < row.length; j++) {
      const currTree = row[j];
      const left = row.slice(0, j).every((tree) => tree < currTree);
      const right = row.slice(j + 1).every((tree) => tree < currTree);

      if (left || right) {
        visibleCount++;
      } else {
        const column = getTreeColumn(treeMatrix, j);
        const top = column.slice(0, i).every((tree) => tree < currTree);
        const bottom = column.slice(i + 1).every((tree) => tree < currTree);
        if (top || bottom) {
          visibleCount++;
        }
      }
    }
  }

  return visibleCount;
};

console.log('Total visible trees: ', calculateVisibleTrees(input)); // Total visible trees: 1859
