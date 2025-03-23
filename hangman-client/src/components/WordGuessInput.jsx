import React from 'react';

const WordGuessInput = () => {
    return (
        <>
            <p className="text-xl">Lets play hangman!</p>
            <input type="text" className="text-sm p-2 focus:outline" placeholder="Enter your name" />
            <button className="text-md bg-red-200 mt-2">Enter</button>
        </>
    )
}

export default WordGuessInput;