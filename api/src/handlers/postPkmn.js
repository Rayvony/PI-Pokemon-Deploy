const { validateFields } = require("../helpers/validateFields");
const { getInDB } = require("../controllers/getInDB");
const { addInDB } = require("../controllers/addInDB");

async function postPkmn(req, res) {
  let {
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
    type1,
    type2,
  } = req.body;

  // Si no valida, se le asigna sprite fantasma
  if (!sprite || typeof sprite !== "string" || sprite.trim() === "") {
    sprite =
      "https://archives.bulbagarden.net/media/upload/6/62/Ghost_I_purple.png";
  }

  const cry = "https://play.pokemonshowdown.com/audio/cries/unown.mp3";

  const fieldsToCheck = {
    name,
    weight,
    height,
    hp,
    atk,
    def,
    spAtk,
    spDef,
    spd,
    type1,
    type2,
  };

  const validationErrors = validateFields(fieldsToCheck);

  if (validationErrors.length > 0) {
    return res.status(400).json({ message: validationErrors.join(". ") });
  }

  try {
    const existingType1 = await getInDB(3, type1);
    let existingType2 = null;

    if (!existingType1) {
      return res
        .status(400)
        .json({ message: "El tipo 1 no existe en la base de datos." });
    }

    if (type2) {
      existingType2 = await getInDB(3, type2);
    }

    const pokemon = {
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
      type1Id: existingType1,
      type2Id: existingType2 ? existingType2 : null,
    };

    const newPokemon = await addInDB(2, pokemon);

    console.log(newPokemon);

    return res.status(201).json(newPokemon);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = { postPkmn };
