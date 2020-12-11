const fs = require("fs");

// Part 1

// const data = fs.readFileSync("day4-data.txt", "utf8").split("\n");

// const requiredKeys = ["byr:", "iyr:", "eyr:", "hgt:", "hcl:", "ecl:", "pid:"];

// const passports = [];
// let index = 0;
// let valid = 0;

// data.forEach((line) => {
//   if (line) {
//     if (passports[index]) {
//       passports[index] += line;
//     } else {
//       passports[index] = line;
//     }
//   } else {
//     index++;
//   }
// });

// passports.forEach((passport) => {
//   const key = passport.match(/[a-z]{3}:/g);
//   const difference = requiredKeys.filter((x) => !key.includes(x));
//   if (difference.length === 0) {
//     valid++;
//   }
// });

// console.log(valid);

// Part 2 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const passports = [];
let index = 0;
let valid = 0;

const data = fs.readFileSync("day4.txt", "utf8").split("\n");

data.forEach((line) => {
  if (line) {
    const splitLine = line.split(" ");
    splitLine.forEach((field) => {
      const keyValue = field.split(":");
      passports[index] = { [keyValue[0]]: keyValue[1], ...passports[index] };
    });
  } else {
    index++;
  }
});

passports.forEach((passport) => {
  // Check for required fields
  if (
    !(
      passport.byr &&
      passport.iyr &&
      passport.eyr &&
      passport.hgt &&
      passport.hcl &&
      passport.ecl &&
      passport.pid
    )
  ) {
    return;
  }

  // Validate fields
  if (!(passport.byr >= 1920 && passport.byr <= 2002)) {
    return;
  }

  if (!(passport.iyr >= 2010 && passport.iyr <= 2020)) {
    return;
  }

  if (!(passport.eyr >= 2020 && passport.eyr <= 2030)) {
    return;
  }

  if (!passport.hcl.match(/#[0-9a-f]{6}/)) {
    return;
  }

  const height = passport.hgt.match(/[0-9]+|[a-z]+/g);

  if (height.length !== 2) {
    return;
  }

  if (height[1] === "cm") {
    if (!(height[0] >= 150 && height[0] <= 193)) {
      return;
    }
  } else {
    if (!(height[0] >= 59 && height[0] <= 76)) {
      return;
    }
  }

  if (
    !(
      passport.ecl === "amb" ||
      passport.ecl === "blu" ||
      passport.ecl === "brn" ||
      passport.ecl === "gry" ||
      passport.ecl === "grn" ||
      passport.ecl === "hzl" ||
      passport.ecl === "oth"
    )
  ) {
    return;
  }

  if (passport.pid.length !== 9) {
    return;
  }

  valid++;
});

console.log(valid);
