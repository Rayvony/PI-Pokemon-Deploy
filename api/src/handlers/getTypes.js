const URL = "https://pokeapi.co/api/v2/type/";
const axios = require("axios");
const { addInDB } = require("../controllers/addInDB");

let cachedTypes = null; // Variable para almacenar los tipos en caché

const getTypes = async (req, res) => {
  try {
    // Si ya hay en caché, devuelve caché
    if (cachedTypes !== null) {
      return res.status(200).json(cachedTypes);
    }

    // Si no hay, guarda los tipos de la API
    const { data } = await axios(URL);
    const typesData = data.results;

    const types = typesData.slice(0, typesData.length - 2).map((typeData) => {
      const id = typeData.url.split("/").filter(Boolean).pop();
      const name = typeData.name;
      return {
        id,
        name,
      };
    });

    await addInDB(1, types);

    cachedTypes = types;

    return res.status(200).json(types);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getTypes,
};
