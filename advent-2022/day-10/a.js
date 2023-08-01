/* --- Day 10: Cathode-Ray Tube --- Part A --- */
// https://adventofcode.com/2022/day/10

const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

const sumSignals = (data) => {
  const signals = data.split('\n').map((s) => {
    const [cycle, value] = s.split(' ');
    return [cycle, value ? Number(value) : 0];
  }); // [[ 'addx', 16 ],  [ 'addx', -11 ], [ 'noop', 0 ], ...]

  let cycleCount = 0;
  let signalSum = 1;
  let importantCycle = 20;
  const signalStrengths = []; // [420, 1140, ...]

  for (const [cycle, value] of signals) {
    cycleCount += cycle === 'noop' ? 1 : 2;

    // Check important cycles (20/60/100/140/180/220) to add signalStrength (signalSum * cycleCount)
    if (cycleCount >= importantCycle && cycleCount <= importantCycle + 1) {
      signalStrengths.push(signalSum * importantCycle);
      importantCycle += 40;
    }

    signalSum += value;
  }

  return signalStrengths.reduce((c, a) => c + a);
};

console.log('The sum of the six signal strengths: ', sumSignals(input)); // Total sum: 12840
