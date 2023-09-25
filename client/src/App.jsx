import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import Detail from "./components/Detail/Detail";
import Form from "./components/Form/Form";
import { getAllPkmns, getTypes, getPkmnByName } from "./redux/actions";

function App() {
  const dispatch = useDispatch();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getAllPkmns())
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, [dispatch]);

  const toggleMusic = () => {
    playSelect();
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  const playSelect = () => {
    const audio = new Audio("../../../assets/emerald_A.wav");
    audio.play();
  };

  const onSearch = async (name) => {
    try {
      await dispatch(getPkmnByName(name));
      setCurrentPage(0);
    } catch (error) {
      alert("No Pokemon with that name");
    }
  };

  return (
    <div>
      <audio
        ref={audioRef}
        src="./assets/Oldale_Town.m4a"
        autoPlay
        loop
        muted={!isPlaying}
      />
      <Nav
        onSearch={onSearch}
        toggleMusic={toggleMusic}
        isPlaying={isPlaying}
        setCurrentPage={setCurrentPage}
        playSelect={playSelect}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Landing toggleMusic={toggleMusic} playSelect={playSelect} />
          }
        />
        <Route
          path="/home"
          element={
            <Home
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              isLoading={isLoading}
              playSelect={playSelect}
            />
          }
        />
        <Route
          path="/detail/:id"
          element={
            <Detail
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              playSelect={playSelect}
            />
          }
        />
        <Route path="/form" element={<Form playSelect={playSelect} />} />
      </Routes>
    </div>
  );
}

export default App;
