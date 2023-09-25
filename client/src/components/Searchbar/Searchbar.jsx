import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { cleanPkmnByName } from "../../redux/actions";
import { useLocation } from "react-router-dom";

export default function SearchBar({ onSearch, playSelect }) {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();

  const onClick = () => {
    playSelect();
    dispatch(cleanPkmnByName(inputValue));
    handleSearch();
  };

  const onChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onClick();
    }
  };

  const handleSearch = () => {
    if (inputValue.trim() !== "") {
      onSearch(inputValue);
      setInputValue("");
    }
  };

  if (location.pathname === "/home") {
    return (
      <div className="searchbarContainer">
        <input
          type="text"
          className="searchBar"
          placeholder="Search by name"
          value={inputValue}
          onChange={onChange}
          onKeyPress={handleKeyPress}
        />
        <button
          onClick={onClick}
          className="material-symbols-rounded botonSearch"
        >
          search
        </button>
      </div>
    );
  }
  return null;
}
