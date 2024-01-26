const { Pokeball } = require("./pokeball");

class Trainer {
  constructor() {
    this.belt = [];
    for (let i = 0; i < 6; i++) {
      this.belt.push(new Pokeball());
    }
  }

  catch(pokemon) {
    for (const pokeball of this.belt) {
      if (pokeball.isEmpty()) {
        pokeball.throw(pokemon);
        return;
      }
    }

    console.log("No empty pokeballs in belt");
  }

  getPokemon(name) {
    for (const pokeball of this.belt) {
      if (!pokeball.isEmpty() && pokeball.pokemon.name === name) {
        return pokeball.throw();
      }
    }
  }
}

module.exports = { Trainer };
