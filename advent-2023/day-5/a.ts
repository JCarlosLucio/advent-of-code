/* --- Day 5: If You Give A Seed A Fertilizer --- Part A --- */
// https://adventofcode.com/2023/day/5

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

const getLowestLocation = (input: string) => {
  const [seedStr, ...rest] = input
    .split('\n\n')
    .map((m) => m.split(':')[1].slice(1));

  const seeds = seedStr.split(' ').map(Number);
  const maps = rest.map((m) =>
    m.split('\n').map((m) => m.split(' ').map(Number))
  );

  const findLocation = createFindLocation(maps);

  const locations = seeds.map(findLocation);

  return Math.min(...locations);
};

console.log('The lowest location number: ', getLowestLocation(input)); // Lowest location number: 486613012
