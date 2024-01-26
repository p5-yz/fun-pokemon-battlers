class Battle {
  constructor(trainer1, trainer2, pokemon1, pokemon2) {
    this.trainer1 = trainer1;
    this.trainer2 = trainer2;
    this.pokemon1 = pokemon1;
    this.pokemon2 = pokemon2;
  }

  fight(turn, move) {
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

    const criticalChance = 0.1;
    if (Math.random() < criticalChance) {
      damageMultiplier *= 3;
      console.log("Critical Hit!");
    }

    if (attacker.hasMovesLeft(move)) {
      defender.takeDamage(attacker.useMove(move) * damageMultiplier);
    } else {
      console.log("Attacker struggles");
      attacker.takeDamage(attacker.useMove(move) * damageMultiplier);
      if (attacker.hasFainted()) {
        console.log("Attacker's pokemon has fainted");
      }
    }

    if (defender.hasFainted()) {
      //console.log("Attacker wins");
      return true;
    }
    return false;
  }
}

module.exports = {
  Battle,
};
