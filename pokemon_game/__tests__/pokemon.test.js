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
} = require("../pokemon");

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
