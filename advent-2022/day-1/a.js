const fs = require('fs');
const contents = fs.readFileSync('input.txt', 'utf8');

const calories = contents.split('\n'); // ['5474',  '4920', '', '10747', '5855', '13827', '', ...]

let totalCalories = 0;
const elfCalories = []; // [123123, 345345, ...]

for (const calorie of calories) {
  if (calorie === '') {
    elfCalories.push(totalCalories);
    totalCalories = 0;
  } else {
    totalCalories += Number(calorie);
  }
}

const mostCalories = Math.max(...elfCalories);

console.log('Most calories: ', mostCalories);
