/* --- Day 2: Cube Conundrum --- Part A --- */
// https://adventofcode.com/2023/day/2

const file = Bun.file('input.txt');
const input = await file.text();

const testInput = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

const BAG: Record<string, number> = { red: 12, green: 13, blue: 14 };

const sumOfIds = (input: string) => {
  const lines = input.split('\n');

  let total = 0;

  for (let i = 0; i < lines.length; i++) {
    const id = i + 1;
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

    const isGamePosible = games.every((game) => {
      for (const color in BAG) {
        if (game[color] > BAG[color]) {
          return false;
        }
      }
      return true;
    });

    if (isGamePosible) {
      total += id;
    }
  }
  return total;
};

console.log('The sum of IDs: ', sumOfIds(input)); // Total: 1734
