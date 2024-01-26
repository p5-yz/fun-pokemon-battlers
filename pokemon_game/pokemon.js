class Pokemon {
  constructor(name, hitPoints, attackDamage, moves) {
    this.name = name;
    this.hitPoints = hitPoints;
    this.attackDamage = attackDamage;
    this.moves = moves;

    this.movesLeft = [];
    for (const dmg of attackDamage) {
      this.movesLeft.push(5 - Math.floor(dmg / 10));
    }
  }

  takeDamage(damage) {
    this.hitPoints -= damage;
  }

  useMove(move) {
    console.log(`${this.name} used ${move}`);
    const index = this.moves.indexOf(move);
    this.movesLeft[index]--;
    return this.attackDamage[index];
  }

  hasMovesLeft(move) {
    const index = this.moves.indexOf(move);
    return this.movesLeft[index] > 0;
  }

  hasFainted() {
    return this.hitPoints <= 0;
  }
}

class Fire extends Pokemon {
  constructor(name, hitPoints, attackDamage, moves) {
    super(name, hitPoints, attackDamage, moves);
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
  constructor(name, hitPoints, attackDamage, moves) {
    super(name, hitPoints, attackDamage, moves);
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
  constructor(name, hitPoints, attackDamage, moves) {
    super(name, hitPoints, attackDamage, moves);
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
  constructor(name, hitPoints, attackDamage, moves) {
    super(name, hitPoints, attackDamage, moves);
    this.type = "normal";
  }

  isEffectiveAgainst(pokemon) {
    return false;
  }

  isWeakTo(pokemon) {
    return false;
  }
}

class Charmander extends Fire {
  constructor(
    name,
    hitPoints = 44,
    attackDamage = [17, 25],
    moves = ["Flamethrower", "move 2"]
  ) {
    super(name, hitPoints, attackDamage, moves);
  }
}

class Squirtle extends Water {
  constructor(
    name,
    hitPoints = 44,
    attackDamage = [16, 24],
    moves = ["Surf", "move 2"]
  ) {
    super(name, hitPoints, attackDamage, moves);
  }
}

class Bulbasaur extends Grass {
  constructor(
    name,
    hitPoints = 45,
    attackDamage = [16, 32],
    moves = ["Razor leaf", "move 2"]
  ) {
    super(name, hitPoints, attackDamage, moves);
  }
}

class Rattata extends Normal {
  constructor(
    name,
    hitPoints = 30,
    attackDamage = [36, 23],
    move = ["Guts", "move 2"]
  ) {
    super(name, hitPoints, attackDamage, move);
  }
}

class Eevee extends Normal {
  constructor(
    name,
    hitPoints = 55,
    attackDamage = [18, 25],
    moves = ["Headbutt", "move 2"]
  ) {
    super(name, hitPoints, attackDamage, moves);
  }
}

class Flareon extends Fire {
  constructor(
    name,
    hitPoints = 65,
    attackDamage = [20, 30],
    moves = ["Fire blast", "move 2"]
  ) {
    super(name, hitPoints, attackDamage, moves);
  }
}

class Vaporeon extends Water {
  constructor(
    name,
    hitPoints = 70,
    attackDamage = [19, 25],
    moves = ["Hydro pump", "move 2"]
  ) {
    super(name, hitPoints, attackDamage, moves);
  }
}

class Leafeon extends Grass {
  constructor(
    name,
    hitPoints = 65,
    attackDamage = [17, 19],
    moves = ["Giga drain", "move 2"]
  ) {
    super(name, hitPoints, attackDamage, moves);
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
  Eevee,
  Flareon,
  Vaporeon,
  Leafeon,
};
