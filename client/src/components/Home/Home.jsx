import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import { useSelector, useDispatch } from "react-redux";
import "./Home.css";
import Pagination from "../Pagination/Pagination";
import { cleanPkmnByID } from "../../redux/actions";
import Loading from "../Loading/Loading";

export default function Home({
  setCurrentPage,
  currentPage,
  isLoading,
  playSelect,
}) {
  const dispatch = useDispatch();
  const filterPkmn = useSelector((state) => state.filterPkmn);
  const pokemonByName = useSelector((state) => state.pokemonByName);
  const itemsPerPage = 12;
  const startIndex = currentPage * itemsPerPage;

  useEffect(() => {
    dispatch(cleanPkmnByID());
  }, []);

  // Usa pokemonByName si tiene datos, de lo contrario, usa filterPkmn
  let currentPokemons = filterPkmn;
  if (pokemonByName.length > 0 && pokemonByName !== null) {
    currentPokemons = pokemonByName;
  }

  if (isLoading) {
    return (
      <div className="homeLoading">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <div className="wrapperCards">
        {currentPokemons
          .slice(startIndex, startIndex + itemsPerPage)
          .map((pkmn) =>
            pkmn && pkmn.id ? (
              <Card
                key={pkmn.id}
                id={pkmn.id}
                name={pkmn.name}
                sprite={pkmn.sprite}
                types={pkmn.types}
                isLoading={isLoading}
                playSelect={playSelect}
              />
            ) : null
          )}
      </div>
      <Pagination
        startIndex={startIndex}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        currentPokemons={currentPokemons}
        playSelect={playSelect}
      />
    </div>
  );
}
