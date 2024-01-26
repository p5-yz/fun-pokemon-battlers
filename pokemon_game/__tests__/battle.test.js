const { Battle } = require("../battle");
const { Trainer } = require("../trainer");
const { Charmander, Squirtle, Bulbasaur, Rattata } = require("../pokemon");

describe("Battle", () => {
  test("battle should have appropriate properties", () => {
    const trainer1 = new Trainer();
    const trainer2 = new Trainer();
    const pokemon1 = new Charmander("charmander", 100, 10);
    const pokemon2 = new Squirtle("squirtle", 100, 10);
    trainer1.catch(pokemon1);
    trainer2.catch(pokemon2);

    const battle = new Battle(trainer1, trainer2, "charmander", "squirtle");

    expect(battle.trainer1).toBe(trainer1);
    expect(battle.trainer2).toBe(trainer2);
    expect(battle.pokemon1).toBe("charmander");
    expect(battle.pokemon2).toBe("squirtle");
  });

  test(".fight() should reduce the appropriate amount of hitpoints on the defender pokemon", () => {
    const trainer1 = new Trainer();
    const trainer2 = new Trainer();
    const pokemon1 = new Rattata("rattata1", 100, 10);
    const pokemon2 = new Rattata("rattata2", 100, 10);
    trainer1.catch(pokemon1);
    trainer2.catch(pokemon2);

    const battle = new Battle(trainer1, trainer2, "rattata1", "rattata2");
    battle.fight(1);

    expect(pokemon2.hitPoints).toBe(90);
  });

  test(".fight() should reduce the appropriate amount of hitpoints on the defender pokemon including damage multipliers", () => {
    const trainer1 = new Trainer();
    const trainer2 = new Trainer();
    const pokemon1 = new Bulbasaur("bulbasaur", 100, 10);
    const pokemon2 = new Charmander("charmander", 100, 10);
    trainer1.catch(pokemon1);
    trainer2.catch(pokemon2);

    const battle = new Battle(trainer1, trainer2, "bulbasaur", "charmander");
    battle.fight(1);

    expect(pokemon2.hitPoints).toBe(92.5);
  });

  test(".fight() should reduce the appropriate amount of hitpoints on the defender pokemon including damage multipliers", () => {
    const trainer1 = new Trainer();
    const trainer2 = new Trainer();
    const pokemon1 = new Charmander("charmander", 100, 10);
    const pokemon2 = new Bulbasaur("bulbasaur", 100, 10);
    trainer1.catch(pokemon1);
    trainer2.catch(pokemon2);

    const battle = new Battle(trainer1, trainer2, "charmander", "bulbasaur");
    battle.fight(1);

    expect(pokemon2.hitPoints).toBe(87.5);
  });

  test(".fight() should return true if the defender faints", () => {
    const trainer1 = new Trainer();
    const trainer2 = new Trainer();
    const pokemon1 = new Charmander("charmander", 100, 10);
    const pokemon2 = new Bulbasaur("bulbasaur", 15, 10);
    trainer1.catch(pokemon1);
    trainer2.catch(pokemon2);

    const battle = new Battle(trainer1, trainer2, "charmander", "bulbasaur");

    expect(battle.fight(1)).toBe(false);
    expect(battle.fight(1)).toBe(true);
  });
});
