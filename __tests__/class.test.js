const {
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
} = require("../class");

describe("Pokemon", () => {
  test("should return attributes from this object", () => {
    const pokemon = new Pokemon("name", 10, 20, "tackle");

    expect(pokemon.name).toBe("name");
    expect(pokemon.hitPoints).toBe(10);
    expect(pokemon.attackDamage).toBe(20);
    expect(pokemon.move).toBe("tackle");
  });
});

describe("Pokemon - methods", () => {
  test(".takeDamage() should reduce .hitPoints appropriatley", () => {
    const pokemon = new Pokemon("name", 10, 20, "tackle");
    pokemon.takeDamage(6);

    const actual = pokemon.hitPoints;
    const expected = 4;

    expect(actual).toBe(expected);
  });

  test(".useMove() should return the .attackDamage", () => {
    const pokemon = new Pokemon("name", 10, 20, "tackle");

    const actual = pokemon.useMove();
    const expected = 20;

    expect(actual).toBe(expected);
  });

  test(".hasFainted() should return appropriate boolean depending on health", () => {
    const pokemon = new Pokemon("name", 10, 20, "tackle");

    expect(pokemon.hasFainted()).toBe(false);
    pokemon.takeDamage(10);
    expect(pokemon.hasFainted()).toBe(true);
  });
});

describe("Pokemon - children", () => {
  test("fire object should return appropriate booleans from methods", () => {
    const fire = new Fire("name", 10, 20, "tackle");
    const grass = new Grass("name", 10, 20, "tackle");
    const water = new Water("name", 10, 20, "tackle");

    expect(fire.isEffectiveAgainst(grass)).toBe(true);
    expect(fire.isEffectiveAgainst(water)).toBe(false);

    expect(fire.isWeakTo(water)).toBe(true);
    expect(fire.isWeakTo(grass)).toBe(false);
  });

  test("grass object should return appropriate booleans from methods", () => {
    const fire = new Fire("name", 10, 20, "tackle");
    const grass = new Grass("name", 10, 20, "tackle");
    const water = new Water("name", 10, 20, "tackle");

    expect(grass.isEffectiveAgainst(water)).toBe(true);
    expect(grass.isEffectiveAgainst(fire)).toBe(false);

    expect(grass.isWeakTo(fire)).toBe(true);
    expect(grass.isWeakTo(water)).toBe(false);
  });

  test("water object should return appropriate booleans from methods", () => {
    const fire = new Fire("name", 10, 20, "tackle");
    const grass = new Grass("name", 10, 20, "tackle");
    const water = new Water("name", 10, 20, "tackle");

    expect(water.isEffectiveAgainst(fire)).toBe(true);
    expect(water.isEffectiveAgainst(grass)).toBe(false);

    expect(water.isWeakTo(grass)).toBe(true);
    expect(water.isWeakTo(fire)).toBe(false);
  });

  test("normal object should return appropriate booleans from methods", () => {
    const fire = new Fire("name", 10, 20, "tackle");
    const grass = new Grass("name", 10, 20, "tackle");
    const water = new Water("name", 10, 20, "tackle");
    const normal = new Normal("name", 10, 20, "tackle");

    expect(normal.isEffectiveAgainst(grass)).toBe(false);
    expect(normal.isEffectiveAgainst(water)).toBe(false);
    expect(normal.isEffectiveAgainst(fire)).toBe(false);
    expect(normal.isEffectiveAgainst(normal)).toBe(false);

    expect(normal.isWeakTo(water)).toBe(false);
    expect(normal.isWeakTo(grass)).toBe(false);
    expect(normal.isWeakTo(fire)).toBe(false);
    expect(normal.isWeakTo(normal)).toBe(false);
  });
});

describe("Pokemon - pokemons", () => {
  test("Charmander object should have the appropriate move value", () => {
    const charmander = new Charmander("name", 10, 20);

    expect(charmander.move).toBe("ember");
  });

  test("Squirtle object should have the appropriate move value", () => {
    const squirtle = new Squirtle("name", 10, 20);

    expect(squirtle.move).toBe("water gun");
  });

  test("Bulbasaur object should have the appropriate move value", () => {
    const bulbasaur = new Bulbasaur("name", 10, 20);

    expect(bulbasaur.move).toBe("vine whip");
  });

  test("Rattata object should have the appropriate move value", () => {
    const rattata = new Rattata("name", 10, 20);

    expect(rattata.move).toBe(undefined);
  });
});

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

describe.only("Battle", () => {});
