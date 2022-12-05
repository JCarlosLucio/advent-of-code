const fs = require('fs');
const contents = fs.readFileSync('input.txt', 'utf8');

const getPriority = (letter) => {
  const charCode = letter.charCodeAt(0);

  if (charCode > 96) return charCode - 96;

  return charCode - 65 + 27;
};

const total = contents
  .split('\n') // ['lnhnQGrMgthMlntlGfQhgWWcRSDcVCrLWzRSrRFDRN',  'PqrrrRnPBbrVhVqFrFVRPVhZLvNSNvLZcQvtJfRvNScJNJ', ...]
  .map((sack) => {
    const second = sack.slice(sack.length / 2);
    return getPriority([...sack].find((item) => second.includes(item)));
  }) // [2, 22, ...]
  .reduce((acc, curr) => acc + curr);

console.log('Total priorities: ', total); // Total Priorities: 7821
