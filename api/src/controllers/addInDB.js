const { Pokemon, Type } = require("../db");
const { handleErrors } = require("../helpers/handleErrors");

const addInDB = async (method, data) => {
  try {
    switch (method) {
      case 1:
        // Agregar tipos a la base de datos
        await Type.bulkCreate(data);
        break;
      case 2:
        try {
          const {
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
            type1Id,
            type2Id,
          } = data;

          // Crear un nuevo Pokémon en la base de datos
          const newPokemon = await Pokemon.create({
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
          });

          // Asignar type1 al Pokémon
          await newPokemon.addType(type1Id);

          // Si type2Id existe, asignarlo al Pokémon
          if (type2Id) {
            await newPokemon.addType(type2Id);
          }
          return newPokemon;
        } catch (error) {
          handleErrors(5);
        }
        break;
      default:
        handleErrors("Caso no válido.");
    }
  } catch (error) {
    console.error(error);
    handleErrors(5);
  }
};

module.exports = {
  addInDB,
};
