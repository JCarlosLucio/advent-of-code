/* --- Day 7: No Space Left On Device --- Part A --- */
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

const totalSize = (data, condition = () => true) => {
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

  return calculateDirSizes(root).reduce(
    (acc, curr) => (condition(curr) ? acc + curr : acc),
    0
  );
};

console.log(
  'Dirs total size: ',
  totalSize(contents, (size) => size <= 100000)
); // Dirs total size: 2061777
