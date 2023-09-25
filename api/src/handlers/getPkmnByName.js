const { getInDB } = require("../controllers/getInDB");
const { handleErrors } = require("../helpers/handleErrors");
const { mapProperties } = require("../helpers/mapProperties");
const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon/";

const getPkmnByName = async (req, res) => {
  try {
    const { value } = req.query;
    const nameLC = value.toLowerCase();
    //trae de la DB
    const pkmnFromDB = await getInDB(1, nameLC);
    let pkmnFromAPI = null;

    try {
      //trae de la api
      const { data } = await axios(`${URL}${nameLC}`);
      pkmnFromAPI = mapProperties(data);
    } catch (apiError) {
      if (apiError.response) {
      } else {
        console.log(apiError);
      }
    }

    // Combina los resultados en foundPkmn
    const foundPkmn = [...pkmnFromDB.flat(), pkmnFromAPI];

    if (foundPkmn[0] === null) {
      return res.status(404).json({ error: "Pokémon not found" });
    }

    return res.status(200).json(foundPkmn);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getPkmnByName,
};
