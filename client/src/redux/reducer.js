import {
  GET_ALLPKMNS,
  GET_TYPES,
  FILTER,
  ORDER,
  GET_PKMNBYNAME,
  GET_PKMNBYID,
  CLEAN_PKMNBYNAME,
  FILTER_TYPE,
  ORDER_ATK,
  CLEAN_PKMNBYID,
} from "./actionTypes";

const initialState = {
  pkmnTypes: [],
  allPokemons: [],
  filterPkmn: [],
  pokemonByName: [],
  pokemonByID: [],
};

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALLPKMNS:
      return { ...state, allPokemons: payload, filterPkmn: payload };
    case GET_PKMNBYNAME:
      return { ...state, pokemonByName: payload };
    case GET_PKMNBYID:
      return { ...state, pokemonByID: payload };
    case CLEAN_PKMNBYNAME:
      return { ...state, pokemonByName: [] };
    case CLEAN_PKMNBYID:
      return { ...state, pokemonByID: [] };
    case GET_TYPES:
      return { ...state, pkmnTypes: payload };

    case FILTER:
      let filteredPokemons;
      if (payload === "true") {
        filteredPokemons = state.allPokemons.filter(
          (pkmn) => !Number.isInteger(pkmn.id)
        );
      } else if (payload === "false") {
        filteredPokemons = state.allPokemons.filter((pkmn) =>
          Number.isInteger(pkmn.id)
        );
      } else {
        filteredPokemons = state.allPokemons;
      }
      return {
        ...state,
        filterPkmn: filteredPokemons,
      };

    case FILTER_TYPE:
      if (isNaN(payload)) {
        return state;
      }

      const filteredByType = state.filterPkmn.filter((pkmn) =>
        pkmn.types.some((type) => payload === type.id)
      );

      return {
        ...state,
        filterPkmn: filteredByType,
      };

    case ORDER:
      if (payload === "A") {
        const orderPKMN = state.filterPkmn
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name));
        return {
          ...state,
          filterPkmn: [...orderPKMN],
        };
      } else if (payload === "D") {
        const orderPKMN = state.filterPkmn
          .slice()
          .sort((a, b) => b.name.localeCompare(a.name));
        return {
          ...state,
          filterPkmn: [...orderPKMN],
        };
      } else {
        return {
          ...state,
        };
      }

    case ORDER_ATK:
      if (payload === "none") return { ...state };
      const orderByAtk = state.filterPkmn.slice().sort((a, b) => {
        const atkA = Number(a.atk);
        const atkB = Number(b.atk);

        if (payload === "A") return atkA - atkB;
        return atkB - atkA;
      });

      return {
        ...state,
        filterPkmn: orderByAtk,
      };

    default:
      return { ...state };
  }
}

export default reducer;
