import React from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import "./Card.css";

export default function Card({
  id,
  sprite,
  name,
  types,
  isLoading,
  playSelect,
}) {
  const handleClick = () => {
    playSelect();
  };
  const typeElements = types.map((type) => (
    <div key={type.id} className={`icon ${type.name}`}>
      <img src={`/assets/icons/${type.id}.svg`} alt={type.name} />
    </div>
  ));

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="cardContainer">
      <Link to={`/detail/${id}`} onClick={handleClick}>
        <div className="Card">
          <div className="spriteContainer">
            <img src={sprite} alt={name} />
          </div>
          <h2>{name}</h2>
          <h3>Types:</h3>
          <div className="wrapper">{typeElements}</div>
        </div>
      </Link>
    </div>
  );
}
