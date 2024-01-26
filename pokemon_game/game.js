const { input, checkbox, Separator } = require("@inquirer/prompts");

async function test() {
  const answer = await checkbox({
    message: "Select a package manager",
    choices: [
      { name: "npm", value: "npm" },
      { name: "yarn", value: "yarn" },
      new Separator(),
      { name: "pnpm", value: "pnpm", disabled: true },
      {
        name: "pnpm",
        value: "pnpm",
        disabled: "(pnpm is not available)",
      },
    ],
  });
  console.log(answer);
}

test();
