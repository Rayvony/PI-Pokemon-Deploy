const URL = "https://pokeapi.co/api/v2/pokemon/";
const { mapProperties } = require("../helpers/mapProperties");
const axios = require("axios");
const { getInDB } = require("../controllers/getInDB");
const uuidRegex =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

const getPkmn = async (req, res) => {
  try {
    const { search } = req.params;
    const idOrName = search.toLowerCase();

    // Intenta buscar el Pokémon en la base de datos utilizando la función getInDB
    if (uuidRegex.test(idOrName)) {
      const dbPokemon = await getInDB(2, idOrName);

      if (dbPokemon) {
        // Si se encuentra en la base de datos, retorna el Pokémon de la base de datos
        return res.status(200).json(dbPokemon[0]);
      }
    } else {
      const { data } = await axios(`${URL}/${idOrName}`);
      if (data.name) {
        const apiPokemon = mapProperties(data);
        return res.status(200).json(apiPokemon);
      } else {
        return res.status(404).send("Not found");
      }
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getPkmn,
};
