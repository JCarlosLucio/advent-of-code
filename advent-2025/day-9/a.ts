/* --- Day 9: Movie Theater --- Part A --- */
// https://adventofcode.com/2025/day/9

const file = Bun.file('input.txt');
const input = await file.text();

const testInput = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`;

function parseInput(input: string) {
  return input
    .split('\n')
    .map((row) => row.split(',').map(Number) as [number, number]);
}

function calculateArea([x1, y1]: [number, number], [x2, y2]: [number, number]) {
  const x = Math.abs(x2 - x1) + 1;
  const y = Math.abs(y2 - y1) + 1;
  return x * y;
}

function calculateAreas(coords: [number, number][]) {
  const areas: number[] = [];
  for (let i = 0; i < coords.length; i++) {
    const coord = coords[i];
    for (let j = i + 1; j < coords.length; j++) {
      const cur = coords[j];
      areas.push(calculateArea(coord, cur));
    }
  }

  return areas;
}

function largestArea(input: string) {
  const coords = parseInput(input);
  const areas = calculateAreas(coords);
  return Math.max(...areas);
}

console.log('Largest area: ', largestArea(input)); // Largest area: 4776487744
