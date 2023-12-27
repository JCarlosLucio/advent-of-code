/* --- Day 6: Wait For It --- Part A --- */
// https://adventofcode.com/2023/day/6

const file = Bun.file('input.txt');
const input = await file.text();

const testInput = `Time:      7  15   30
Distance:  9  40  200`;

const parseInput = (input: string): number[][] => {
  return input
    .split('\n')
    .map((s) => s.split(':')[1].split(' ').filter(Boolean).map(Number));
};

const countWays = (time: number, maxDist: number) => {
  let count = 0;

  for (let speed = 1; speed < time; speed++) {
    const timeLeft = time - speed;
    const distance = timeLeft * speed;

    if (distance > maxDist) count++;
  }

  return count;
};

const getProduct = (input: string) => {
  const [times, distances] = parseInput(input);

  const nums: number[] = [];

  for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const maxDist = distances[i];

    const numberOfWays = countWays(time, maxDist);

    nums.push(numberOfWays);
  }

  return nums.reduce((acc, curr) => acc * curr, 1);
};

console.log(
  'Product of number of ways to beat the record: ',
  getProduct(input)
); // Product of number of ways to beat the record: 281600
