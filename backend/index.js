const express = require("express");
const axios = require("axios");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 3000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, 
  })
);
app.use(express.json());

app.use(
  session({
    secret: "super-secret-key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, 
      collectionName: "session",
    }),
    cookie: { secure: false },
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
      await req.session.save();

      return res.json({
        message: "Game started",
        sessionSet: true,
        partialWord: req.session.partialWord,
        inCorrectGuess: req.session.inCorrectGuess,
        actualWord: req.session.word,
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
    actualWord: req.session.word,
  });
});

app.post("/api/guess-word", (req, res) => {
  const { word, partialWord, inCorrectGuess } = req.session;
  const { key } = req.body;
  let isFound = false;

  word.split("").forEach((char, index) => {
    if (key === char) {
      partialWord[index] = key;
      isFound = true;
    }
  });

  if (!isFound) {
    inCorrectGuess.push(key);
  }

  req.session.save();

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
