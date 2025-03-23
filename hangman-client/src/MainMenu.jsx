import React from "react";
import { twJoin } from "tailwind-merge";
import { useNavigate } from "react-router";

const MainMenu = () => {
  const [name, setName] = React.useState("");
  const navigate = useNavigate();
  const [validate, setValidate] = React.useState(true);
  return (
    <>
      <p className="text-xl">Lets play hangman!</p>
      <input
        type="text"
        className={twJoin("text-sm border-2 p-2 focus:border-lime-400 outline-none mr-2 rounded", !validate && 'border-red-400')}
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className="text-md bg-slate-200 text-sm p-2 mt-2 cursor-pointer rounded"
        onClick={() => {
          if (name !== "") {
            setValidate(true);
            navigate("/game");
          } else {
            setValidate(false);
          }
        }}
      >
        Enter
      </button>
    </>
  );
};

export default MainMenu;
