const mapProperties = (data) => {
  const { id, name, weight, height, stats, sprites, types } = data;

  let sprite;
  let cry = `https://play.pokemonshowdown.com/audio/cries/${name}.mp3`;

  if (
    sprites.versions["generation-v"]["black-white"].animated.front_default !==
    null
  ) {
    sprite =
      sprites.versions["generation-v"]["black-white"].animated.front_default;
  } else if (sprites.other["official-artwork"].front_default !== null) {
    sprite = sprites.other["official-artwork"].front_default;
  } else {
    sprite =
      "https://archives.bulbagarden.net/media/upload/6/62/Ghost_I_purple.png";
  }

  const statsMap = {};
  for (const stat of stats) {
    statsMap[stat.stat.name] = stat.base_stat;
  }

  const hp = statsMap["hp"];
  const atk = statsMap["attack"];
  const def = statsMap["defense"];
  const spAtk = statsMap["special-attack"];
  const spDef = statsMap["special-defense"];
  const spd = statsMap["speed"];

  return {
    id,
    name,
    weight,
    height,
    sprite,
    hp,
    atk,
    def,
    spAtk,
    spDef,
    spd,
    cry,
    types: types.map((typeData) => ({
      id: typeData.type.url.split("/").filter(Boolean).pop(),
      name: typeData.type.name,
    })),
  };
};

module.exports = {
  mapProperties,
};
