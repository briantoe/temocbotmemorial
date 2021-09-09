// let items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; //… your array, filled with values
// const n = 3; //tweak this to add more items per line

// const result = new Array(Math.ceil(items.length / n))
//   .fill()
//   .map((_) => items.splice(0, n));

// console.log(result);
// items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; //… your array, filled with values

// let result2 = [];
// const len = items.length;
// for (let i = 0; i < Math.ceil(len / n); i++) {
//   result2.push(items.splice(0, n));
// }
// console.log(result2);

// console.log(new Array(Math.ceil(10 / n)).fill());


const moment = require('moment')
const input = '5s';

moment().format();

let x = moment.duration(5, 's');
console.log(x)
let y = moment.duration(50000).as("milliseconds");
console.log(y)