/* --- Day 7: No Space Left On Device --- Part B --- */
// https://adventofcode.com/2022/day/7

const fs = require('fs');
const contents = fs.readFileSync('input.txt', 'utf8');

const calculateDirSizes = (dir) => {
  const dirSizes = []; // [584, 95966,...];

  const calculateDirSize = (dir) => {
    let dirSize = 0;
    for (const file in dir.files) {
      dirSize += dir.files[file];
    }

    for (const nestedDir in dir.dirs) {
      const nestedDirSize = calculateDirSize(dir.dirs[nestedDir]);
      dirSize += nestedDirSize;
    }

    dirSizes.push(dirSize);

    return dirSize;
  };

  calculateDirSize(dir);

  return dirSizes;
};

const generateDirTree = (data) => {
  const output = data.split('\n');

  const root = { files: {}, dirs: {} }; // { dirs: { [dirname]: {dirs:{...}, files: {...}} }, files: {[filename]:'asdf', size: 345345} } };

  let current = root;

  for (const line of output) {
    const [type, cmd, dirname] = line.split(' ');
    //    type: $ | dir | number
    //   cmd: cd | ls | filename
    //    dirname: dirname | undefined

    if (type === '$') {
      if (cmd === 'cd') {
        if (dirname === '..') {
          current = current.parent;
        } else if (dirname === '/') {
          current = root;
        } else {
          if (!current.dirs[dirname]) {
            current.dirs[dirname] = { parent: current, files: {}, dirs: {} };
          }
          current = current.dirs[dirname];
        }
      }
    } else if (type !== 'dir') {
      current.files[cmd] = Number(type);
    }
  }

  return root;
};

const smallestDirForUpdate = (data, updateSize) => {
  const root = generateDirTree(data);
  const dirSizes = calculateDirSizes(root);

  const rootSize = dirSizes.at(-1); // last one is root dir or largest
  const availableSpace = 70000000 - rootSize;
  const spaceNeeded = updateSize - availableSpace;

  return Math.min(...dirSizes.filter((size) => size >= spaceNeeded));
};

console.log(
  'Smallest dir for update: ',
  smallestDirForUpdate(contents, 30000000)
); // Smallest dir for update: 4473403
