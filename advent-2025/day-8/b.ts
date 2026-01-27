/* --- Day 8: Playground --- Part B --- */
// https://adventofcode.com/2025/day/8#part2

const file = Bun.file('input.txt');
const input = await file.text();

const testInput = `162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`;

function parseInput(input: string) {
  return input
    .split('\n')
    .map((r) => r.split(',').map((s) => Number(s)) as [number, number, number]);
}

function getDistance(
  c1: [number, number, number],
  c2: [number, number, number]
) {
  return Math.sqrt(
    (c1[0] - c2[0]) ** 2 + (c1[1] - c2[1]) ** 2 + (c1[2] - c2[2]) ** 2
  );
}

function getDistances(boxes: [number, number, number][]) {
  const distances: [number, [number, number]][] = [];

  for (let i = 0; i < boxes.length; i++) {
    const coord = boxes[i];
    for (let j = i; j < boxes.length; j++) {
      const cur = boxes[j];
      const distance = getDistance(coord, cur);
      if (distance <= 0) {
        continue;
      }
      distances.push([distance, [i, j]]);
    }
  }

  distances.sort((a, b) => a[0] - b[0]);

  return distances;
}

function multiplyLastXCoords(input: string) {
  const boxes = parseInput(input);
  const distances = getDistances(boxes);
  const connections = distances.map(([, points]) => new Set(points));

  let lastConnection: Set<number> | null = null;
  for (let i = 0; i < connections.length; i++) {
    if (lastConnection) {
      break;
    }
    for (let j = 0; j < connections.length; j++) {
      const cur = connections[j];
      if (i === j) {
        continue;
      }
      if (connections[i].intersection(cur).size > 0) {
        connections[j] = connections[i].union(cur);
        if (connections[j].size === boxes.length) {
          lastConnection = cur;
          if (connections[i].size < cur.size) {
            lastConnection = connections[i];
          }
        }

        connections[i].clear();
        break;
      }
    }
  }

  return lastConnection?.values().reduce((a, c) => a * boxes[c][0], 1);
}

console.log('Last X coords multiplied: ', multiplyLastXCoords(input)); // Last X coords multiplied: 8361881885
