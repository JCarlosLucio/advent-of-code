/* --- Day 10: Cathode-Ray Tube --- Part B --- */
// https://adventofcode.com/2022/day/10#part2

const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

const produceImage = (data) => {
  const signals = data.split('\n').map((s) => {
    const [cycle, value] = s.split(' ');
    return [cycle, value ? Number(value) : 0];
  }); // [[ 'addx', 16 ],  [ 'addx', -11 ], [ 'noop', 0 ], ...]

  let cycleCount = 0;
  let pixelPos = 1;
  const pixels = [1];

  for (const [cycle, value] of signals) {
    cycleCount++;
    pixels[cycleCount] = pixelPos;

    if (cycle !== 'noop') {
      pixelPos += value;
      cycleCount++;
      pixels[cycleCount] = pixelPos;
    }
  }

  const image = Array.from({ length: 6 }, () =>
    Array.from({ length: 40 }, () => '')
  ); // array with 6 rows and 40 columns -> [ ['',...39 elements], ... 5 elements]

  for (let i = 0; i < image.length; i++) {
    const row = image[i];

    for (let j = 0; j < row.length; j++) {
      const pos = i * 40 + j;

      if (Math.abs(pixels[pos] - j) <= 1) {
        image[i][j] = '#';
      } else {
        image[i][j] = ' ';
      }
    }
  }

  return image.map((row) => row.join(''));
};

console.log('Image produced: ', produceImage(input));
/**
  Image produced:  [
    '#### #  #   ## #### ###    ## #### #### ',
    '   # # #     # #    #  #    # #       # ',
    '  #  ##      # ###  ###     # ###    #  ',
    ' #   # #     # #    #  #    # #     #   ',
    '#    # #  #  # #    #  # #  # #    #    ',
    '#### #  #  ##  #    ###   ##  #    #### '
  ]
*/
