const fs = require('fs');
const contents = fs.readFileSync('input.txt', 'utf8');

const getPriority = (letter) => {
  const charCode = letter.charCodeAt(0);

  if (charCode > 96) return charCode - 96;

  return charCode - 65 + 27;
};

const rucksacks = contents.split('\n'); // ['lnhnQGrMgthMlntlGfQhgWWcRSDcVCrLWzRSrRFDRN',  'PqrrrRnPBbrVhVqFrFVRPVhZLvNSNvLZcQvtJfRvNScJNJ', ...]

const groups = []; // [['lnhnQGrMgthMlnt',  'PqrrrRnPBbrVhVqFrFVRPV','lGfQhgWWcRSDcVC'], ...]

let tempGroup = [];

for (const sack of rucksacks) {
  tempGroup.push(sack);
  if (tempGroup.length === 3) {
    groups.push(tempGroup);
    tempGroup = [];
  }
}

const total = groups
  .map(([first, second, third]) => {
    const badge = [...first].find(
      (item) => second.includes(item) && third.includes(item)
    );

    return getPriority(badge);
  }) // [2, 22, ...]
  .reduce((acc, curr) => acc + curr);

console.log('Total priorities: ', total); // Total priorities:  2752
