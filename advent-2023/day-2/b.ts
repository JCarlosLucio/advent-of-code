/* --- Day 2: Cube Conundrum --- Part B --- */
// https://adventofcode.com/2023/day/2#part2

const file = Bun.file('input.txt');
const input = await file.text();

const testInput = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

const sumOfPowers = (input: string) => {
  const lines = input.split('\n');

  let total = 0;

  for (let i = 0; i < lines.length; i++) {
    const games = lines[i]
      .split(':')[1]
      .split(';')
      .map((s) =>
        s.split(',').reduce<Record<string, number>>(
          (acc, curr) => {
            const cube = curr.trim().split(' ');
            acc[cube[1]] = Number(cube[0]);
            return acc;
          },
          { red: 0, green: 0, blue: 0 }
        )
      );

    const minSet = games.reduce<Record<string, number>>(
      (acc, curr) => {
        const max = { ...acc };
        for (const color in acc) {
          max[color] = Math.max(max[color], curr[color]);
        }
        return max;
      },
      { red: 0, green: 0, blue: 0 }
    );

    total += minSet.red * minSet.green * minSet.blue;
  }

  return total;
};

console.log('The sum of the power of sets: ', sumOfPowers(input)); // Total: 70387
