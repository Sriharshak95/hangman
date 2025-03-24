import React from "react";
import { twJoin } from "tailwind-merge";
import { useNavigate } from "react-router";

const MainMenu = () => {
  const [name, setName] = React.useState("");
  const navigate = useNavigate();
  const [validate, setValidate] = React.useState(true);

  const handleStart = () => {
    if (name.trim() !== "") {
      localStorage.setItem("playerName", name);
      setValidate(true);
      navigate("/game");
    } else {
      setValidate(false);
    }
  }
  return (
    <>
      <h2 className="text-xl">Lets play hangman!</h2>
      <input
        type="text"
        className={twJoin("text-md border-2 p-2 focus:border-lime-400 outline-none mr-2 rounded", !validate && 'border-red-400')}
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className="text-md bg-slate-500 text-white px-4 py-2 mt-2 cursor-pointer rounded-lg shadow-md 
        hover:bg-slate-700 active:scale-95 transition-all duration-200 ease-in-out 
        disabled:bg-gray-400 disabled:cursor-not-allowed"
        onClick={() => handleStart()}
      >
        Enter
      </button>
    </>
  );
};

export default MainMenu;
