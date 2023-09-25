import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPkmnByID } from "../../redux/actions";
import Loading from "../Loading/Loading";
import "./Detail.css";

export default function Detail({ isLoading, setIsLoading, playSelect }) {
  const { id } = useParams();
  const pokemonByID = useSelector((state) => state.pokemonByID);
  const dispatch = useDispatch();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const loadingTimer = setTimeout(() => {
      dispatch(getPkmnByID(id))
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching Pokémon:", error);
          setIsLoading(false);
        });
    }, 750); //milisegundos

    return () => {
      clearTimeout(loadingTimer);
    };
  }, [dispatch, id]);

  const handleImageClick = () => {
    if (pokemonByID.cry) {
      const audio = new Audio(pokemonByID.cry);
      audio.play().catch((error) => {
        console.error("Error while playing audio:", error);
      });
      setIsPlaying(true);
    }
  };

  const typeElements = pokemonByID.types?.map((type) => (
    <div key={type.id} className={`icon ${type.name}`}>
      <img src={`/assets/icons/${type.id}.svg`} alt={type.name} />
    </div>
  ));

  if (isLoading) {
    return (
      <div className="DetailContainer">
        <div className="Detail">
          <Loading />
        </div>
      </div>
    );
  }

  if (!pokemonByID) {
    return <div className="Detail">Pokemon not found</div>;
  }
  return (
    <div className="DetailContainer">
      <div className="Detail">
        <NavLink
          to="/home"
          className="material-symbols-rounded"
          onClick={playSelect}
        >
          cancel
        </NavLink>
        <div className="spriteContainer">
          <img
            className="pkmnSprite"
            src={pokemonByID.sprite}
            alt={pokemonByID.name}
            onClick={handleImageClick}
          />
        </div>
        <h2>{pokemonByID.name}</h2>
        <div className="stat">
          <span>ID:</span> {id}
        </div>
        <div className="DetailStats">
          <div className="stat">
            <span>HP:</span> {pokemonByID.hp}
          </div>
          <div className="stat">
            <span>SPD:</span> {pokemonByID.spd}
          </div>
          <div className="stat">
            <span>ATK:</span> {pokemonByID.atk}
          </div>
          <div className="stat">
            <span>SP.ATK:</span> {pokemonByID.spAtk}
          </div>
          <div className="stat">
            <span>DEF:</span> {pokemonByID.def}
          </div>
          <div className="stat">
            <span>SP.DEF:</span> {pokemonByID.spDef}
          </div>
          <div className="stat">
            <span>Height:</span>
            <p>{pokemonByID.height / 10}m</p>
          </div>
          <div className="stat">
            <span>Weight:</span>
            <p>{pokemonByID.weight / 10}kg</p>
          </div>
        </div>
        <span className="stat">Types:</span>
        <div className="wrapper">{typeElements}</div>
      </div>
    </div>
  );
}
