class Pokeball {
  throw(pokemon) {
    if (pokemon === undefined) {
      if (this.pokemon === undefined) {
        console.log("No pokemon in ball");
      } else {
        console.log(`GO ${this.pokemon.name}`);
      }
      return this.pokemon;
    }

    if (this.pokemon === undefined) {
      this.pokemon = pokemon;
      console.log(`you caught ${pokemon.name}`);
    }
  }

  isEmpty() {
    return this.pokemon === undefined;
  }

  contains() {
    if (this.pokemon === undefined) {
      return "empty ...";
    } else {
      return this.pokemon.name;
    }
  }
}

module.exports = { Pokeball };
