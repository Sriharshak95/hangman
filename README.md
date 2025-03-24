# Hangman Game

This project is a simple Hangman game with a React frontend and a Node.js backend. The backend fetches a random word and manages the game state, while the frontend provides an interactive interface for playing the game.

## Features
- Fetches a random word from an API
- Stores game state in session
- Allows guessing letters
- Displays partially revealed words and incorrect guesses
- Supports session persistence across browser restarts

## Prerequisites
Ensure you have the following installed:
- Node.js (>= 20.x)
- npm (>= 9.x)
- MongoDB (for session storage)

---

## Backend Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/hangman-game.git
   cd backend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file and add your MongoDB connection string:
   ```env
   MONGO_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/your_database
   ```

4. Start the backend server:
   ```sh
   npm start
   ```
   The backend will run on `http://localhost:3000`.

---

## Frontend Setup

1. Navigate to the frontend directory:
   ```sh
   cd ../hangman-client
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the React app:
   ```sh
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`.

---

## How to Play
1. Open the frontend in your browser: `http://localhost:5173`
2. A new game starts automatically with a hidden word.
3. Type a letter to guess.
4. If correct, the letter is revealed in the word.
5. If incorrect, it's added to the list of incorrect guesses.
6. Continue guessing until you either complete the word or run out of chances.
7. Restart the game using the play again button.

---

## API Endpoints

### `GET /api/random-word`
- Starts a new game and fetches a random word.
- Returns the partially hidden word and incorrect guesses.

### `POST /api/guess-word`
- Accepts a letter as input and updates the game state.
- Returns the updated word and incorrect guesses.

### `GET /api/reset`
- Resets the game session.
