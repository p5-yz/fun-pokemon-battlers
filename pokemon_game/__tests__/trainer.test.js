const { Trainer } = require("../trainer");
const { Pokeball } = require("../pokeball");
const { Charmander, Squirtle } = require("../pokemon");

describe("Trainer", () => {
  test(".belt should be an array that contains 6 empty pokeballs", () => {
    const trainer = new Trainer();
    const belt = trainer.belt;

    expect(Array.isArray(belt)).toBe(true);

    for (let i = 0; i < 6; i++) {
      expect(belt[i] instanceof Pokeball).toBe(true);
      expect(belt[i].isEmpty()).toBe(true);
    }
  });

  test(".catch() should catch the pokemon in one of the empty pokeballs", () => {
    const trainer = new Trainer();
    const charmander = new Charmander("charmander", 10, 20);
    const squirtle = new Squirtle("squirtle", 10, 20);

    trainer.catch(charmander);
    trainer.catch(squirtle);
    trainer.catch(charmander);
    trainer.catch(squirtle);
    trainer.catch(charmander);
    trainer.catch(squirtle);
    trainer.catch(charmander);

    expect(trainer.belt[0].pokemon).toBe(charmander);
    expect(trainer.belt[1].pokemon).toBe(squirtle);
    expect(trainer.belt[2].pokemon).toBe(charmander);
    expect(trainer.belt[3].pokemon).toBe(squirtle);
    expect(trainer.belt[4].pokemon).toBe(charmander);
    expect(trainer.belt[5].pokemon).toBe(squirtle);
  });

  test(".getPokemon() should return the pokemon when called with the pokemons name", () => {
    const trainer = new Trainer();
    const charmander = new Charmander("charmander", 10, 20);
    const squirtle = new Squirtle("squirtle", 10, 20);

    trainer.catch(charmander);
    trainer.catch(squirtle);

    expect(trainer.getPokemon("charmander")).toBe(charmander);
    expect(trainer.getPokemon("squirtle")).toBe(squirtle);
  });
});
