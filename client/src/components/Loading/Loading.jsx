import React from "react";
import "./Loading.css";

export default function Loading() {
  return (
    <div className="loading">
      <div class="ball"></div>
      <div class="loading-text">
        <div class="letter">L</div>
        <div class="letter">o</div>
        <div class="letter">a</div>
        <div class="letter">d</div>
        <div class="letter">i</div>
        <div class="letter">n</div>
        <div class="letter">g</div>
        <div class="letter">.</div>
        <div class="letter">.</div>
        <div class="letter">.</div>
      </div>
    </div>
  );
}
