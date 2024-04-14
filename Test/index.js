// async function datafetcher(url) {
//     const response = await fetch(url);
//     const data = await response.json();
//     return data;
// }

const { log } = require("console");

// async function get() {
//    const data =  await datafetcher("https://jsonplaceholder.typicode.com/todos");
//    console.log(data);
// }

// get();

// //generators in Js,  generators are special functions that can --
// // be paused and resumed, allowing you to generate a sequence of --
// // values lazily.
// // * after function

// function* logNums() {
//   console.log("started");
//   yield 1;
//   console.log("Run first item");
//   yield 2;
//   console.log("Run second item");
//   yield 3;
// }

// const ans = logNums();

// console.log(ans.next().value); // output: started 1
// console.log(ans.next().value); // output: Run first item 2

// find plaindrome number
const array = [121, 234, 232];
const array2 = [123, 43, 45];

// function isPalindrome(num) {
//     let reverse = num.toString().split('').reverse().join('');
//     return reverse === num.toString();
// // }

// var mergeTwoLists = function (list1, list2) {
//   let result = [];
//   while (list1.length && list2.length) {
//     if (list1[0] < list2[0]) {
//       result.push(list1.shift());
//     } else {
//       result.push(list2.shift());
//     }
//   }
//   while (list1.length) {
//     result.push(list1.shift());
//   }
//   while (list2.length) {
//     result.push(list2.shift());
//   }
//   return result;
// };

// console.log(mergeTwoLists(array, array2));

//
// var lengthOfLastWord = function (s) {
//   const words = s.split(" ");
//   const newword = [];
//   const reverseword = words.reverse();
//   for (let i = words.length - 1; i >= 0; i--) {
//     if (words[i].length > 0) {
//       newword.push(reverseword[i]);
//     }
//   }
//   const lastnm = newword[newword.length - 1];
//   return lastnm.length;
// };

// console.log(lengthOfLastWord("   fly me   to   the moon  "));


// var containsDuplicate = function(nums) {
//   let set = new Set();
//   for (let i = 0; i < nums.length; i++) {
//     if (set.has(nums[i])) {
//       return true;
//     }
//     set.add(nums[i]);
//   }
//   return false;
    
// };

// //result should be 4
// [1,2,4] 


const r = [1,2,3,4,5,3];
const g = r[3];


console.log(g);
