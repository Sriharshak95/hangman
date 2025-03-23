import { useState } from "react";
import "./App.css";
import MainMenu from "./MainMenu";
import { Routes, Route } from "react-router";
import Game from './Game';

function App() {
  return (
    <Routes>
      <Route index path="/" element={<MainMenu />} />
      <Route index path="game" element={<Game />} />
    </Routes>
  );
}

export default App;
