import axios from "axios";
import {
  GET_ALLPKMNS,
  FILTER,
  ORDER,
  GET_TYPES,
  GET_PKMNBYNAME,
  GET_PKMNBYID,
  CLEAN_PKMNBYNAME,
  CLEAN_PKMNBYID,
  FILTER_TYPE,
  ORDER_ATK,
} from "./actionTypes";

export const getAllPkmns = () => {
  const endpoint =
    "https://pi-pokemon-deploy-production-75eb.up.railway.app/proyectoPKMN/pokemons/";
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);

      return dispatch({
        type: GET_ALLPKMNS,
        payload: data,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const getTypes = () => {
  const endpoint =
    "https://pi-pokemon-deploy-production-75eb.up.railway.app/proyectoPKMN/types/";
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);

      return dispatch({
        type: GET_TYPES,
        payload: data,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const getPkmnByName = (name) => {
  const endpoint = `https://pi-pokemon-deploy-production-75eb.up.railway.app/proyectoPKMN/pokemon/name?value=${name}`;
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);

      return dispatch({
        type: GET_PKMNBYNAME,
        payload: data,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const getPkmnByID = (id) => {
  const endpoint = `https://pi-pokemon-deploy-production-75eb.up.railway.app/proyectoPKMN/pokemon/${id}`;
  return async (dispatch) => {
    try {
      const { data } = await axios.get(endpoint);

      return dispatch({
        type: GET_PKMNBYID,
        payload: data,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const cleanPkmnByName = () => {
  return {
    type: CLEAN_PKMNBYNAME,
  };
};

export const cleanPkmnByID = () => {
  return {
    type: CLEAN_PKMNBYID,
  };
};

export const filter = (isFromDB) => {
  return {
    type: FILTER,
    payload: isFromDB,
  };
};

export const filterType = (typeID) => {
  return {
    type: FILTER_TYPE,
    payload: typeID,
  };
};

export const order = (orderType, payload) => {
  switch (orderType) {
    case "atk":
      return {
        type: ORDER_ATK,
        payload,
      };

    case "name":
      return {
        type: ORDER,
        payload,
      };

    default:
      return {
        type: ORDER,
        payload: "none",
      };
  }
};

export const orderAtk = (payload) => ({
  type: ORDER_ATK,
  payload,
});
