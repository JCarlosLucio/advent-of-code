/* --- Day 7: Camel Cards --- Part B --- */
// https://adventofcode.com/2023/day/7#part2

const file = Bun.file('input.txt');
const input = await file.text();

const testInput = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

type Hand = {
  hand: string;
  bid: number;
  freqs: number[];
};

const parseInput = (input: string): Hand[] => {
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
      const jFreq = cardFreqs['J'] ?? 0;
      delete cardFreqs['J'];

      const freqsDesc = Object.values(cardFreqs).toSorted((a, b) => b - a);

      // add J count to max (first item)
      freqsDesc[0] = (freqsDesc[0] ?? 0) + jFreq;

      return {
        hand,
        bid: Number(bid),
        freqs: freqsDesc,
      };
    });
};

const compareHands = (a: Hand, b: Hand) => {
  // sort by max strength
  const maxA = a.freqs[0];
  const maxB = b.freqs[0];

  if (maxA !== maxB) {
    return maxA - maxB;
  }

  // sort two pairs
  const aHasTwoPairs = a.freqs.filter((f) => f === 2).length === 2;
  const bHasTwoPairs = b.freqs.filter((f) => f === 2).length === 2;

  if (aHasTwoPairs !== bHasTwoPairs) {
    return Number(aHasTwoPairs) - Number(bHasTwoPairs);
  }

  // sort full house
  const isFullHouseA = a.freqs.includes(3) && a.freqs.includes(2);
  const isFullHouseB = b.freqs.includes(3) && b.freqs.includes(2);

  if (isFullHouseA !== isFullHouseB) {
    return Number(isFullHouseA) - Number(isFullHouseB);
  }

  // sort by card strength
  const STRENGTH = 'J23456789TQKA';

  const aByStrength = [...a.hand].reduce<number[]>(
    (acc, curr) => [...acc, STRENGTH.indexOf(curr)],
    []
  );
  const bByStrength = [...b.hand].reduce<number[]>(
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

export const getTotalWinningsWithJokers = (input: string) => {
  const hands = parseInput(input);

  const sorted = hands.toSorted(compareHands);

  return sorted.reduce((acc, curr, i) => acc + curr.bid * (i + 1), 0);
};

console.log('Total winnings B: ', getTotalWinningsWithJokers(input)); // Total winnings: 250506580
