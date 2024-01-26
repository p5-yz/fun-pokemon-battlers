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
};
