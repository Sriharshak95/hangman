const express = require("express");
const axios = require("axios");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 3000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // React frontend URL
    credentials: true, // Allow cookies to be sent
  })
);
app.use(express.json());

// Session Middleware
app.use(
  session({
    secret: "super-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Change to true if using HTTPS
  })
);

// Route to fetch random word
app.get("/api/random-word", async (req, res) => {
  if (!req.session.word) {
    try {
      const response = await axios.get(
        "https://random-word.ryanrk.com/api/en/word/random"
      );
      req.session.word = response.data[0];
      req.session.partialWord = Array(req.session.word.length).fill("_");
      req.session.inCorrectGuess = [];
      return res.json({
        message: "Game started",
        sessionSet: true,
        partialWord: req.session.partialWord,
        inCorrectGuess: req.session.inCorrectGuess,
        actualWord: req.session.word
      });
    } catch (error) {
      console.error("Error fetching word:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  res.json({
    message: "Game resumed!",
    partialWord: req.session.partialWord,
    inCorrectGuess: req.session.inCorrectGuess,
    actualWord: req.session.word
  });
});

app.post("/api/guess-word", async (req, res) => {
  const { word, partialWord, inCorrectGuess } = req.session;
  const { key } = req.body;
  let isFound = false;
  word.split("").map((char, index) => {
    if (key === char) {
      partialWord[index] = key;
      isFound = true;
    }
  });
  if (!isFound) {
    inCorrectGuess.push(key);
  }
  res.json({ partialWord, inCorrectGuess, found: isFound });
});

app.get("/api/reset", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Failed to reset session", sessionKill: false });
    }
    res.redirect("/");
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
