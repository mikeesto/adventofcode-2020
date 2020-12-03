const readline = require("readline");
const fs = require("fs");

const readInterface = readline.createInterface({
  input: fs.createReadStream("./day3.txt"),
  console: false,
});

const input = [];
let total = 1;

readInterface.on("line", (line) => {
  input.push(line.split(""));
});

// // Part 1
// readInterface.on("close", () => {
//   let x = 0;
//   let y = 0;
//   let trees = 0;
//   const end = input.length - 1;

//   while (y < end) {
//     for (let i = 0; i < 3; i++) {
//       x++;
//       if (x >= input[y].length) {
//         x = 0;
//       }
//     }

//     y += 1;

//     if (input[y][x] === "#") {
//       trees++;
//     }
//   }
//   console.log(trees);

// Part 2
readInterface.on("close", () => {
  checkTrees(1, 1);
  checkTrees(3, 1);
  checkTrees(5, 1);
  checkTrees(7, 1);
  checkTrees(1, 2);

  console.log(total);
});

function checkTrees(right, down) {
  let x = 0;
  let y = 0;
  let trees = 0;
  const end = input.length - 1;

  while (y < end) {
    for (let i = 0; i < right; i++) {
      x++;
      if (x >= input[y].length) {
        x = 0;
      }
    }

    y += down;

    if (input[y][x] === "#") {
      trees++;
    }
  }
  total *= trees;
}
