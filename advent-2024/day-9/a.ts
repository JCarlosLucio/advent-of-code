/* --- Day 9: Disk Fragmenter --- Part A --- */
// https://adventofcode.com/2024/day/9

const file = Bun.file('input.txt');
const input = await file.text();

const testInput = '2333133121414131402';

function parseInput(input: string): (string | number)[] {
  return input
    .split('')
    .map((b) => Number(b))
    .flatMap((num, i) => Array(num).fill(i % 2 === 0 ? i / 2 : '.'));
}

function compact(blocks: (string | number)[]): (string | number)[] {
  let left = 0;
  let right = blocks.length - 1;

  while (left < right) {
    const blockL = blocks[left];
    const blockR = blocks[right];

    if (blockL === '.' && blockR !== '.') {
      [blocks[left], blocks[right]] = [blocks[right], blocks[left]]; // swap values
    }
    if (blockL !== '.') {
      left++;
    }
    if (blockR === '.') {
      right--;
    }
  }

  return blocks;
}

function calcChecksum(input: string): number {
  const blocks = parseInput(input);
  const compacted = compact(blocks);

  let checksum = 0;
  for (let i = 0; i < compacted.length; i++) {
    const block = compacted[i];
    if (block === '.') {
      break;
    }
    if (typeof block === 'number') {
      checksum += i * block;
    }
  }
  return checksum;
}

console.log('Checksum: ', calcChecksum(input)); // Checksum: 6344673854800
