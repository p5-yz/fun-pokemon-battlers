class Pokemon {
  constructor(name, hitPoints, attackDamage, move) {
    this.name = name;
    this.hitPoints = hitPoints;
    this.attackDamage = attackDamage;
    this.move = move;
  }

  takeDamage(damage) {
    this.hitPoints -= damage;
  }

  useMove() {
    console.log(`${this.name} used ${this.move}`);
    return this.attackDamage;
  }

  hasFainted() {
    return this.hitPoints <= 0;
  }
}

class Fire extends Pokemon {
  constructor(name, hitPoints, attackDamage, move) {
    super(name, hitPoints, attackDamage, move);
    this.type = "fire";
  }

  isEffectiveAgainst(pokemon) {
    return pokemon.type === "grass";
  }

  isWeakTo(pokemon) {
    return pokemon.type === "water";
  }
}

class Grass extends Pokemon {
  constructor(name, hitPoints, attackDamage, move) {
    super(name, hitPoints, attackDamage, move);
    this.type = "grass";
  }

  isEffectiveAgainst(pokemon) {
    return pokemon.type === "water";
  }

  isWeakTo(pokemon) {
    return pokemon.type === "fire";
  }
}

class Water extends Pokemon {
  constructor(name, hitPoints, attackDamage, move) {
    super(name, hitPoints, attackDamage, move);
    this.type = "water";
  }

  isEffectiveAgainst(pokemon) {
    return pokemon.type === "fire";
  }

  isWeakTo(pokemon) {
    return pokemon.type === "grass";
  }
}

class Normal extends Pokemon {
  constructor(name, hitPoints, attackDamage, move) {
    super(name, hitPoints, attackDamage, move);
    this.type = "fire";
  }

  isEffectiveAgainst(pokemon) {
    return false;
  }

  isWeakTo(pokemon) {
    return false;
  }
}

class Charmander extends Fire {
  constructor(name, hitPoints, attackDamage, move = "ember") {
    super(name, hitPoints, attackDamage, move);
  }
}

class Squirtle extends Water {
  constructor(name, hitPoints, attackDamage, move = "water gun") {
    super(name, hitPoints, attackDamage, move);
  }
}

class Bulbasaur extends Grass {
  constructor(name, hitPoints, attackDamage, move = "vine whip") {
    super(name, hitPoints, attackDamage, move);
  }
}

class Rattata extends Normal {
  constructor(name, hitPoints, attackDamage, move) {
    super(name, hitPoints, attackDamage, move);
  }
}

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

class Battle {
  constructor(trainer1, trainer2, pokemon1, pokemon2) {
    this.trainer1 = trainer1;
    this.trainer2 = trainer2;
    this.pokemon1 = pokemon1;
    this.pokemon2 = pokemon2;
  }

  fight(turn) {
    let attacker;
    let defender;
    let damageMultiplier = 1;
    if (turn === 1) {
      attacker = this.trainer1.getPokemon(this.pokemon1);
      defender = this.trainer2.getPokemon(this.pokemon2);
    } else {
      attacker = this.trainer2.getPokemon(this.pokemon2);
      defender = this.trainer1.getPokemon(this.pokemon1);
    }

    if (defender.isEffectiveAgainst(attacker)) {
      damageMultiplier = 0.75;
      console.log(
        `Defender is stronger than attacker, attack only deals ${
          damageMultiplier * 100
        }% damange`
      );
    } else if (defender.isWeakTo(attacker)) {
      damageMultiplier = 1.25;
      console.log(
        `Defender is weaker than attacker, attack deals ${
          damageMultiplier * 100
        }% damange`
      );
    } else {
      console.log(
        `Defender is neither stronger nor weaker than attacker, attack deals ${
          damageMultiplier * 100
        }% damange`
      );
    }

    defender.hitPoints -= attacker.attackDamage * damageMultiplier;

    if (defender.hasFainted()) {
      console.log("Attacker wins");
      return true;
    }
    return false;
  }
}

module.exports = {
  Pokemon,
  Fire,
  Water,
  Grass,
  Normal,
  Charmander,
  Squirtle,
  Bulbasaur,
  Rattata,
  Pokeball,
  Trainer,
  Battle,
};
