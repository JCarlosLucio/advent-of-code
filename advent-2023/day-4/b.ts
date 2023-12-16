/* --- Day 4: Scratchcards --- Part B --- */
// https://adventofcode.com/2023/day/4#part2

const file = Bun.file('input.txt');
const input = await file.text();

const testInput = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

const sumScratchcards = (input: string) => {
  const cards = input.split('\n').map((card) =>
    card
      .split(': ')[1]
      .split(' | ')
      .map((n) => n.split(' ').filter((n) => n !== ''))
  );

  const generated: Record<number, number[]> = {}; // {1 :  [2, 3, 4, 5],}
  let stack: number[] = [];

  for (const [i, [win, own]] of cards.entries()) {
    let count = 0;
    const cardNum = i + 1;
    stack.push(cardNum);

    for (const num of own) {
      if (win.includes(num)) {
        count++;
      }
    }

    generated[cardNum] = Array.from(
      { length: count },
      (_, i) => cardNum + i + 1
    );
  }

  let total = 0;

  while (stack.length) {
    const curr = stack.pop();
    if (!curr) break;

    total++;

    stack = [...stack, ...generated[curr]];
  }

  return total;
};

console.log('Total Scratchcards: ', sumScratchcards(input)); // Total Scratchcards: 7185540
