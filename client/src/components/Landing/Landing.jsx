import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Landing.css";

function Landing({ toggleMusic, playSelect }) {
  return (
    <div className="containerLanding">
      <div>
        <img
          className="professor"
          src="../../../assets/Juniper.png"
          alt="Professor Juniper"
        />
      </div>
      <div className="dialogueBox pixel-corners">
        <span>
          Welcome trainer! My name is Professor Juniper. <br />
          Would you mind helping me study these fascinating creatures?
        </span>
      </div>
      <img
        className="arrow blink"
        src="../../../assets/arrow.png"
        alt="Arrow"
      />
      <div className="options pixel-corners">
        <div className="grid">
          <div className="btn">
            <NavLink className={"NavLink "} to="/home" onClick={toggleMusic}>
              Yes!
            </NavLink>
          </div>
          <div className="btn">
            <NavLink className={"NavLink "} to="/home" onClick={toggleMusic}>
              Sure!
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
