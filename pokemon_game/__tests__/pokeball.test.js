const { Pokeball } = require("../pokeball");
const { Charmander, Squirtle } = require("../pokemon");

describe("Pokeball", () => {
  test(".throw() should take pokemon as an argument and store it if the pokeball is empty", () => {
    const pokeball = new Pokeball();
    const charmander = new Charmander("charmander", 10, 20);
    const squirtle = new Squirtle("squirtle", 10, 20);

    pokeball.throw(charmander);
    pokeball.throw(squirtle);

    expect(pokeball.pokemon).toBe(charmander);
  });

  test(".throw() should allow no argument in which case it returns the stored pokemon", () => {
    const pokeball = new Pokeball();
    const charmander = new Charmander("charmander", 10, 20);
    pokeball.throw(charmander);

    const actual = pokeball.throw();
    const expected = charmander;

    expect(actual).toBe(expected);
  });

  test(".throw() should allow no argument in which case it returns undefined if pokeball is empty", () => {
    const pokeball = new Pokeball();

    const actual = pokeball.throw();
    const expected = undefined;

    expect(actual).toBe(expected);
  });

  test(".isEmpty() should return an appropriate boolean depending on whether a pokemon is stored or not", () => {
    const pokeball = new Pokeball();
    const charmander = new Charmander("charmander", 10, 20);

    expect(pokeball.isEmpty()).toBe(true);
    pokeball.throw(charmander);
    expect(pokeball.isEmpty()).toBe(false);
  });

  test('.contains() should return the name of the stored pokemon, or "empty ..." if empty', () => {
    const pokeball = new Pokeball();
    const charmander = new Charmander("charmander", 10, 20);

    expect(pokeball.contains()).toBe("empty ...");
    pokeball.throw(charmander);
    expect(pokeball.contains()).toBe("charmander");
  });
});
