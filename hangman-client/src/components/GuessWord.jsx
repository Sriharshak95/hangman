import React from "react";

const GuessWord = ({char, index}) => {
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
};

export default GuessWord;
