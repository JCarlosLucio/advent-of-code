/* --- Day 5: Print Queue --- Part A --- */
// https://adventofcode.com/2024/day/5

const file = Bun.file('input.txt');
const input = await file.text();

const testInput = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

type Rules = Map<number, Set<number>>;

function parseInput(input: string) {
  const [rulesStr, pagesStr] = input.split('\n\n').map((i) => i.split('\n'));
  const rules = rulesStr
    .map((r) => r.split('|').map(Number))
    .reduce<Rules>((acc, cur) => {
      const set = acc.get(cur[0]);
      acc.set(cur[0], set ? set.add(cur[1]) : new Set([cur[1]]));
      return acc;
    }, new Map());
  const pages = pagesStr.map((p) => p.split(',').map(Number));

  return { rules, pages };
}

function checkOrder(page: number[], rules: Rules): boolean {
  for (let i = 0; i < page.length; i++) {
    const cur = page[i];
    const rest = new Set(page.slice(i + 1));
    const restInOrder = rest.isSubsetOf(rules.get(cur) ?? new Set());

    if (!restInOrder) {
      return false;
    }
  }
  return true;
}

function getMiddlePage(nums: number[]): number {
  return nums[Math.floor(nums.length / 2)];
}

function sumMiddlePages(input: string): number {
  const { rules, pages } = parseInput(input);

  let sum = 0;
  for (const page of pages) {
    if (checkOrder(page, rules)) {
      sum += getMiddlePage(page);
    }
  }

  return sum;
}

console.log('Sum middle pages: ', sumMiddlePages(input)); // Sum middle pages: 4814
