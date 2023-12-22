/* --- Day 5: If You Give A Seed A Fertilizer --- Part B --- */
// https://adventofcode.com/2023/day/5#part2

const file = Bun.file('input.txt');
const input = await file.text();
const testInput = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

const createFindLocation = (maps: number[][][]): ((num: number) => number) => {
  return (num: number) =>
    maps.reduce((curr, m) => {
      for (const [dest, start, qty] of m) {
        if (curr >= start && curr < start + qty) {
          return curr - start + dest;
        }
      }
      return curr;
    }, num);
};

const createFindSeed = (maps: number[][][]): ((num: number) => number) => {
  return (num: number) =>
    maps.reduceRight((curr, m) => {
      for (const [dest, start, qty] of m) {
        if (curr >= dest && curr < dest + qty) {
          return curr - dest + start;
        }
      }
      return curr;
    }, num);
};

const getLowestLocation = (input: string) => {
  const [seedInput, ...rest] = input
    .split('\n\n')
    .map((m) => m.split(':')[1].slice(1));

  const seeds = seedInput.split(' ').map(Number);
  const maps = rest.map((m) =>
    m.split('\n').map((m) => m.split(' ').map(Number))
  );

  const isValidSeed = (seed: number) => {
    for (let i = 0; i < seeds.length; i += 2) {
      if (seed >= seeds[i] && seed < seeds[i] + seeds[i + 1]) {
        return true;
      }
    }
    return false;
  };

  const possibleSeeds = seeds
    .filter((_, i) => i % 2 === 0)
    .concat(
      maps.flatMap((map, i) =>
        map.flatMap(([dest, _start, qty]) => {
          const findSeed = createFindSeed(maps.slice(0, i + 1));
          const foundSeed = findSeed(dest);
          return [foundSeed, foundSeed + qty];
        })
      )
    )
    .filter(isValidSeed);

  const findLocation = createFindLocation(maps);

  return Math.min(...possibleSeeds.map(findLocation));
};

console.log('The lowest location number: ', getLowestLocation(input)); // Lowest location number: 56931769
