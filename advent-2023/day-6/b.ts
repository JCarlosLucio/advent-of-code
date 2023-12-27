/* --- Day 6: Wait For It --- Part B --- */
// https://adventofcode.com/2023/day/6#part2

const file = Bun.file('input.txt');
const input = await file.text();

const testInput = `Time:      7  15   30
Distance:  9  40  200`;

const parseInput = (input: string): number[] => {
  return input
    .replaceAll(' ', '')
    .split('\n')
    .map((s) => Number(s.split(':')[1]));
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

const getNumberOfWays = (input: string) => {
  const [time, maxDist] = parseInput(input);

  return countWays(time, maxDist);
};

console.log('Number of ways to beat the record: ', getNumberOfWays(input)); // Number of ways to beat the record: 33875953
