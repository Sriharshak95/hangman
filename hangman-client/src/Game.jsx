import React from "react";
import { alphabets } from "./utils";
import HangmanDraw from "./components/HangmanDraw";
import GuessWord from "./components/GuessWord";
import GuessButton from "./components/GuessButton";
import Spinner from "./components/Spinner";

const Game = () => {
  const [word, setWord] = React.useState([]);
  const [inCorrectGuesses, setIncorrectGuess] = React.useState([]);
  const [actualWord, setActualWord] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);

  const playerName = localStorage.getItem("playerName") || "Player";

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
    if (isSearching) return;

    setIsSearching(true);
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
    } finally {
      setIsSearching(false);
    }
  };

  const quitGame = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:3000/api/reset", {
      credentials: "include",
    });
    localStorage.removeItem("playerName");
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

  const isGameOver = inCorrectGuesses.length > 5;
  const isGameWon = word.every((char) => char !== "_");

  if (word.length === 0) {
    return <Spinner />;
  }

  return (
    <div className="grid grid-cols-2">
      <div className="text-center">
        <h2 className="text-xl font-bold mb-4">Welcome, {playerName}!</h2>
        <HangmanDraw inCorrectGuess={inCorrectGuesses.length} />
      </div>
      <div className="mx-auto">
        <div className="flex gap-3 flex-wrap justify-center">
          {word.map((char, index) => {
            return <GuessWord char={char} index={index} />;
          })}
        </div>
        <div className="mt-4 grid grid-flow-row auto-rows-max grid-cols-5 gap-2 w-[300px]">
          {alphabets.map((alphabet) => (
            <GuessButton
              alphabet={alphabet}
              word={word}
              inCorrectGuesses={inCorrectGuesses}
              searchWord={searchWord}
              isSearching={isSearching}
            />
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <button
            className="text-md bg-red-500 text-white px-4 py-2 mt-4 cursor-pointer rounded-lg shadow-md 
             hover:bg-red-700 active:scale-95 transition-all duration-200 ease-in-out 
             disabled:bg-gray-400 disabled:cursor-not-allowed"
            onClick={() => quitGame()}
          >
            Quit Game
          </button>
        </div>

        {(isGameOver || isGameWon) && (
          <div className="bg-white absolute inset-0 flex items-center justify-center">
            <div>
              {isGameWon ? (
                <h2 className="text-lg">
                  Hurray, <b>{playerName}</b>! You won. Guess Word:{" "}
                  {word.join("")}
                </h2>
              ) : (
                <h2 className="text-lg">
                  Sorry, <b>{playerName}</b>! Game Over. Correct Answer:{" "}
                  <b>{actualWord}</b>
                </h2>
              )}
              {!isLoading ? (
                <button
                  className="text-md bg-slate-500 text-white px-4 py-2 mt-2 cursor-pointer rounded-lg shadow-md 
                           hover:bg-slate-700 active:scale-95 transition-all duration-200 ease-in-out 
                           disabled:bg-gray-400 disabled:cursor-not-allowed text-center"
                  onClick={() => quitGame()}
                  disabled={isLoading} // Prevent clicks while loading
                >
                  {isLoading ? "Restarting..." : "Play Again"}
                </button>
              ) : (
                <Spinner />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
