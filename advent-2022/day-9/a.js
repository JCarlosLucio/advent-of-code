/* --- Day 9: Rope Bridge --- Part A --- */
// https://adventofcode.com/2022/day/9

const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

const movement = {
  R: [1, 0],
  U: [0, 1],
  L: [-1, 0],
  D: [0, -1],
};

const touching = (head, tail) =>
  Math.abs(head[0] - tail[0]) <= 1 && Math.abs(head[1] - tail[1]) <= 1;

const countVisitedByTail = (data) => {
  const motions = data.split('\n').map((m) => {
    const [dir, dist] = m.split(' ');
    return { dir, dist: Number(dist) };
  }); // [{ dir: 'D', dist: 2 }, { dir: 'L', dist: 2 }, ...]

  // initial positions
  const head = [0, 0];
  const tail = [0, 0];

  const visited = new Set();
  visited.add(tail.toString()); // Add initial position

  // start movement
  for (const motion of motions) {
    for (let i = 0; i < motion.dist; i++) {
      // move head
      head[0] += movement[motion.dir][0];
      head[1] += movement[motion.dir][1];

      // move tail
      if (!touching(head, tail)) {
        tail[0] +=
          head[0] === tail[0]
            ? 0
            : (head[0] - tail[0]) / Math.abs(head[0] - tail[0]);
        tail[1] +=
          head[1] === tail[1]
            ? 0
            : (head[1] - tail[1]) / Math.abs(head[1] - tail[1]);

        // Add each position visited
        visited.add(tail.toString());
      }
    }
  }

  return visited.size;
};

console.log(
  'Total positions the tail of the rope visited at least once: ',
  countVisitedByTail(input)
); // Total motions: 6098
