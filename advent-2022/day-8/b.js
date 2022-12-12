/* --- Day 8: Treetop Tree House --- Part B --- */
// https://adventofcode.com/2022/day/8

const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

const getTreeColumn = (rows, j) =>
  rows.reduce((acc, curr) => [...acc, curr[j]], []);

const countTrees = (trees, treeSize) => {
  let count = 0;
  for (const tree of trees) {
    count++;
    if (tree >= treeSize) {
      return count;
    }
  }
  return count;
};

const calculateHighestScenicScore = (data) => {
  const treeMatrix = data
    .split('\n')
    .map((row) => row.split('').map((tree) => Number(tree))); // [[1, 2, 3, ...], [4, 6, 8, ...]]

  let highest = 0;

  for (let i = 0; i < treeMatrix.length; i++) {
    const row = treeMatrix[i];
    for (let j = 0; j < row.length; j++) {
      const currTree = row[j];
      const column = getTreeColumn(treeMatrix, j);

      const left = countTrees(row.slice(0, j).reverse(), currTree);
      const right = countTrees(row.slice(j + 1), currTree);
      const top = countTrees(column.slice(0, i).reverse(), currTree);
      const bottom = countTrees(column.slice(i + 1), currTree);

      const scenicScore = left * right * top * bottom;

      if (scenicScore > highest) {
        highest = scenicScore;
      }
    }
  }

  return highest;
};

console.log('Highest scenic score: ', calculateHighestScenicScore(input)); // Highest scenic score: 332640
