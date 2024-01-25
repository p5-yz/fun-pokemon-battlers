const { input } = require("@inquirer/prompts");

const x = input({ message: "enter something: " });
console.log(x);
