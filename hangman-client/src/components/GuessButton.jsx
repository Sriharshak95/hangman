import React from "react";
import { twJoin } from "tailwind-merge";

const GuessButton = ({
  alphabet,
  word,
  inCorrectGuesses,
  searchWord,
  isSearching,
}) => {
  return (
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
          : "",
        isSearching ? "opacity-50 cursor-not-allowed" : "" // Disable when searching
      )}
      key={alphabet}
      onClick={() => searchWord(alphabet)}
      disabled={
        word.includes(alphabet) ||
        inCorrectGuesses.includes(alphabet) ||
        isSearching
      } // Disable all buttons when searching
    >
      {alphabet}
    </button>
  );
};

export default GuessButton;
