const { Pokemon, Type } = require("../db");
const { mapTypes } = require("../helpers/mapTypes");
const { handleErrors } = require("../helpers/handleErrors");

const getInDB = async (method, idOrName) => {
  try {
    switch (method) {
      case 1:
        const pkmnFromDB = await Pokemon.findAll({
          where: { name: idOrName },
          include: [
            {
              model: Type,
              attributes: ["id", "name"],
            },
          ],
        });

        if (!pkmnFromDB || pkmnFromDB.length === 0) {
        }
        const mappedData = pkmnFromDB.map((pokemon) => mapTypes(pokemon));

        return mappedData;

      case 2:
        const dbPokemon = await Pokemon.findOne({
          where: { id: idOrName },
          include: [
            {
              model: Type,
              attributes: ["name", "id"],
            },
          ],
        });
        const pokemon = mapTypes(dbPokemon);

        if (!dbPokemon) {
          return handleErrors(2);
        }
        return pokemon;

      case 3:
        const type = await Type.findOne({ where: { id: idOrName } });

        if (!type) {
          return handleErrors(3);
        }
        return type.id;

      case 4:
        const allPokemonsFromDB = await Pokemon.findAll({
          include: [
            {
              model: Type,
              attributes: ["id", "name"],
            },
          ],
        });

        if (!allPokemonsFromDB || allPokemonsFromDB.length === 0) {
          return null;
        }

        const mappedAllPokemons = allPokemonsFromDB.map((pokemon) =>
          mapTypes(pokemon)
        );
        return mappedAllPokemons;

      default:
        return handleErrors("Caso no válido.");
    }
  } catch (error) {
    console.error(error);
    handleErrors(4);
  }
};

module.exports = {
  getInDB,
};
