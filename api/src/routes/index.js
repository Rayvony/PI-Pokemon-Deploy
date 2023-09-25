const { getAllPkmn } = require("../handlers/getAllPkmn");
const { getPkmn } = require("../handlers/getPkmn");
const { getPkmnByName } = require("../handlers/getPkmnByName");
const { postPkmn } = require("../handlers/postPkmn");
const { getTypes } = require("../handlers/getTypes");
const router = require("express").Router()

router.get("/pokemons/:page?", getAllPkmn);

// Obtener un pokémon por su nombre (query)
router.get("/pokemon/name", getPkmnByName);

// Obtener un pokémon por su ID o nombre (desde la api)
router.get("/pokemon/:search", getPkmn);


router.post("/pokemon", postPkmn);

router.get("/types", getTypes);

module.exports = router;