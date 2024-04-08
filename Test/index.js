// async function datafetcher(url) {
//     const response = await fetch(url);
//     const data = await response.json();
//     return data;
// }

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
