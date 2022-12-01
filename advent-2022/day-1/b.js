const fs = require('fs');
const contents = fs.readFileSync('input.txt', 'utf8');

const calories = contents.split('\n'); // ['5474',  '4920', '', '10747', '5855', '13827', '', ...]

let caloriesPerElf = 0;
const elfCalories = []; // [123123, 345345, ...]

for (const calorie of calories) {
  if (calorie === '') {
    elfCalories.push(caloriesPerElf);
    caloriesPerElf = 0;
  } else {
    caloriesPerElf += Number(calorie);
  }
}

const [top1, top2, top3] = elfCalories.sort((a, b) => b - a); // sort from most to least

const totalTopThree = top1 + top2 + top3;

console.log('Top 3 total: ', totalTopThree);
