const mapTypes = (pokemon) => {
  return [
    {
      id: pokemon.id,
      name: pokemon.name,
      weight: pokemon.weight,
      height: pokemon.height,
      sprite: pokemon.sprite,
      hp: pokemon.hp,
      atk: pokemon.atk,
      def: pokemon.def,
      spAtk: pokemon.spAtk,
      spDef: pokemon.spDef,
      spd: pokemon.spd,
      cry: pokemon.cry,
      types: pokemon.Types.map((type) => ({
        id: type.id.toString(),
        name: type.name,
      })),
    },
  ];
};

module.exports = {
  mapTypes,
};
