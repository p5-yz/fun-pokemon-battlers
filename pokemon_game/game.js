const inquirer = require("inquirer");
const { Trainer } = require("./trainer");
const { Battle } = require("./battle");
const {
  Eevee,
  Flareon,
  Vaporeon,
  Rattata,
  Leafeon,
  Charmander,
  Squirtle,
  Bulbasaur,
} = require("./pokemon");

const availablePokemon = [
  "Eevee",
  "Flareon",
  "Vaporeon",
  "Rattata",
  "Leafeon",
  "Charmander",
  "Squirtle",
  "Bulbasaur",
];

const pokemonSelection = [
  //... see examples to how to format questions
  {
    type: "list",
    name: "pokemon",
    message: "Which pokemon do you choose?",
    choices: availablePokemon,
  },
  {
    type: "input",
    name: "name",
    message: "What would you like to name this pokemon?",
  },
];

const playAgainMenu = [
  //... see examples to how to format questions
  {
    type: "list",
    name: "choice",
    message: "Would you like to play again?",
    choices: ["Yes", "No"],
  },
];

function createPokemon(pokemon, name) {
  switch (pokemon) {
    case "Eevee":
      return new Eevee(name);
    case "Flareon":
      return new Flareon(name);
    case "Vaporeon":
      return new Vaporeon(name);
    case "Rattata":
      return new Rattata(name);
    case "Leafeon":
      return new Leafeon(name);
    case "Charmander":
      return new Charmander(name);
    case "Squirtle":
      return new Squirtle(name);
    case "Bulbasaur":
      return new Bulbasaur(name);
  }
}

async function playGame() {
  const playerTrainer = new Trainer();
  const enemyTrainer = new Trainer();

  console.log("Choose your 6 pokemon");
  const playerPokemonNames = [];
  for (let i = 0; i < 6; i++) {
    // Generate enemy pokemon
    const randomEnemyPokemon =
      availablePokemon[Math.floor(Math.random() * availablePokemon.length)];
    enemyTrainer.catch(createPokemon(randomEnemyPokemon, i));

    // Get player pokemon
    await inquirer.prompt(pokemonSelection).then(function (pokemonAnswers) {
      const playerPokemon = createPokemon(
        pokemonAnswers.pokemon,
        pokemonAnswers.name
      );
      playerPokemonNames.push(pokemonAnswers.name);
      playerTrainer.catch(playerPokemon);
    });
  }

  const playerPokemonSelection = [
    //... see examples to how to format questions
    {
      type: "list",
      name: "pokemon",
      message: "Which pokemon do you choose?",
      choices: playerPokemonNames,
    },
  ];

  while (!playerTrainer.hasAllFainted() && !enemyTrainer.hasAllFainted()) {
    // PLAYER TURN

    for (i = 0; i < 6; i++) {
      const name = playerPokemonNames[i].split(" ")[0];
      const health = playerTrainer.getPokemon(name).hitPoints;
      playerPokemonNames[i] = `${name} - health: ${Math.max(health, 0)}`;
    }

    let pokemonHasFainted = false;
    let playerPokemonName;
    await inquirer
      .prompt(playerPokemonSelection)
      .then(function (pokemonSelection) {
        const playerPokemon = playerTrainer.getPokemon(
          pokemonSelection.pokemon.split(" ")[0]
        );
        playerPokemonName = pokemonSelection.pokemon.split(" ")[0];
        if (playerPokemon.hasFainted()) {
          pokemonHasFainted = true;
        }
      });

    if (pokemonHasFainted) {
      console.log("This pokemon has fainted! Please choose another pokemon");
      continue;
    }

    let enemyPokemonName;
    for (let i = 0; i < 6; i++) {
      const enemyPokemon = enemyTrainer.getPokemon(i);
      if (!enemyPokemon.hasFainted()) {
        enemyPokemonName = i;
        break;
      }
    }

    const battle = new Battle(
      playerTrainer,
      enemyTrainer,
      playerPokemonName,
      enemyPokemonName
    );

    if (battle.fight(1)) {
      console.log("Your opponents pokemon has fainted!");
    }

    if (!enemyTrainer.getPokemon(enemyPokemonName).hasFainted()) {
      if (battle.fight(2)) {
        console.log("Your pokemon has fainted!");
      }
    }
  }

  if (enemyTrainer.hasAllFainted()) {
    console.log("Congratulations, You won!");
  } else {
    console.log("Game over, you lost");
  }
}

async function gameloop() {
  let playAgain = true;
  while (playAgain) {
    await playGame();
    await inquirer.prompt(playAgainMenu).then(function (playAgainChoice) {
      if (playAgainChoice.choice === "No") {
        playAgain = false;
      }
    });
  }
}

gameloop();
