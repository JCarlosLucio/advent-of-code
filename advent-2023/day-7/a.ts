/* --- Day 7: Camel Cards --- Part A --- */
// https://adventofcode.com/2023/day/7

const file = Bun.file('input.txt');
const input = await file.text();

const testInput = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

const parseInput = (input: string) => {
  return input
    .split('\n')
    .map((s) => s.trim().split(' '))
    .map(([hand, bid]) => {
      const cardFreqs = [...hand].reduce<Record<string, number>>(
        (acc, char) => {
          acc[char] = acc[char] ? ++acc[char] : 1;
          return acc;
        },
        {}
      );

      return [hand, Number(bid), cardFreqs];
    });
};

const compareHands = (
  a: (string | number | Record<string, number>)[],
  b: (string | number | Record<string, number>)[]
) => {
  const aFreq: number[] = Object.values(a[2]);
  const bFreq: number[] = Object.values(b[2]);

  // sort by max strength
  const maxA = Math.max(...aFreq);
  const maxB = Math.max(...bFreq);

  if (maxA !== maxB) {
    return maxA - maxB;
  }

  // sort two pairs
  const aHasTwoPairs = aFreq.filter((f) => f === 2).length === 2;
  const bHasTwoPairs = bFreq.filter((f) => f === 2).length === 2;

  if (aHasTwoPairs !== bHasTwoPairs) {
    return Number(aHasTwoPairs) - Number(bHasTwoPairs);
  }

  // sort full house
  const isFullHouseA = aFreq.includes(3) && aFreq.includes(2);
  const isFullHouseB = bFreq.includes(3) && bFreq.includes(2);

  if (isFullHouseA !== isFullHouseB) {
    return Number(isFullHouseA) - Number(isFullHouseB);
  }

  // sort by card strength
  const STRENGTH = '23456789TJQKA';

  const aByStrength = [...(a[0] as string)].reduce<number[]>(
    (acc, curr) => [...acc, STRENGTH.indexOf(curr)],
    []
  );
  const bByStrength = [...(b[0] as string)].reduce<number[]>(
    (acc, curr) => [...acc, STRENGTH.indexOf(curr)],
    []
  );

  for (let i = 0; i < aByStrength.length; i++) {
    const aCard = aByStrength[i];
    const bCard = bByStrength[i];

    if (aCard !== bCard) {
      return aCard - bCard;
    }
  }

  return 0;
};

export const getTotalWinnings = (input: string) => {
  const hands = parseInput(input);

  const sorted = hands.toSorted(compareHands);

  return sorted.reduce(
    (acc, curr, i) => acc + (curr[1] as number) * (i + 1),
    0
  );
};

console.log('Total winnings: ', getTotalWinnings(input)); // Total winnings:  250058342
