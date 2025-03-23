import React from "react";
import { alphabets } from "./utils";
import { twJoin } from "tailwind-merge";
import { useNavigate } from "react-router";
import HangmanDraw from "./components/HangmanDraw";

const Game = () => {
  const [word, setWord] = React.useState([]);
  const [inCorrectGuesses, setIncorrectGuess] = React.useState([]);
  const [actualWord, setActualWord] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const getWord = async (controller) => {
    const response = await fetch("http://localhost:3000/api/random-word", {
      signal: controller.signal,
      credentials: "include",
    });
    const data = await response.json();
    setIncorrectGuess(data.inCorrectGuess);
    setWord(data.partialWord);
    setActualWord(data.actualWord);
  };

  const searchWord = async (key) => {
    try {
      const response = await fetch("http://localhost:3000/api/guess-word", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });
      const data = await response.json();
      setIncorrectGuess(data.inCorrectGuess);
      setWord(data.partialWord);
    } catch (error) {
      console.log(error);
    }
  };

  const quitGame = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:3000/api/reset", {
      credentials: "include",
    });

    if (response.redirected) {
      window.location.href = "/";
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const controller = new AbortController();
    getWord(controller);
    return () => controller.abort();
  }, []);

  if (word.length === 0) {
    return (
      <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    );
  }

  return (
    <div className="grid grid-cols-2">
      <HangmanDraw inCorrectGuess={inCorrectGuesses.length} />
      <div>
        <div className="flex gap-3 flex-wrap">
          {word.map((char, index) => {
            return (
              <input
                type="text"
                maxLength="1"
                className="otp-input w-12 h-12 text-center border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-yellow-100"
                defaultValue={char === "_" ? "" : char}
                disabled
                key={char + index}
              />
            );
          })}
        </div>
        <div className="mt-4 grid grid-flow-row auto-rows-max grid-cols-5 gap-2">
          {alphabets.map((alphabet) => (
            <button
              className={twJoin(
                "cursor-pointer w-12 h-12 text-center border-2 border-gray-300 rounded-md disabled:cursor-none",
                word.includes(alphabet)
                  ? "disabled:border-lime-300 bg-transparent"
                  : "",
                inCorrectGuesses.includes(alphabet)
                  ? "disabled:border-red-300 bg-transparent"
                  : "",
                !word.includes(alphabet) && !inCorrectGuesses.includes(alphabet)
                  ? "hover:bg-zinc-300"
                  : ""
              )}
              key={alphabet}
              onClick={() => searchWord(alphabet)}
              disabled={
                word.includes(alphabet) || inCorrectGuesses.includes(alphabet)
              }
            >
              {alphabet}
            </button>
          ))}
        </div>

        {(inCorrectGuesses.length > 5 ||
          (word.length !== 0 && word.every((char) => char !== "_"))) && (
          <div className="bg-white absolute inset-0 flex items-center justify-center">
            <div>
              {word.every((char) => char !== "_") ? (
                <h2>Hurray! you won. Guess Word: {word.join("")}</h2>
              ) : (
                <div>
                  Game Over! Correct Answer: <b>{actualWord}</b>
                </div>
              )}
              {!isLoading ? (
                <button
                  className="text-md bg-slate-200 text-sm p-2 mt-2 cursor-pointer rounded"
                  onClick={() => quitGame()}
                >
                  Play Again
                </button>
              ) : (
                <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
