import axios from "axios";
const endpoint = "/pokemon/";

export async function postPkmn(pokemon) {
  try {
    const response = await axios.post(endpoint, pokemon);
    return response.data;
  } catch (error) {
    console.log(error.message);
    throw new Error("No se pudo cargar el pokémon");
  }
}
