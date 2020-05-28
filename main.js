//constants
const suits = ["h", "c", "d", "s"];
const values = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
];

let deck = [];

for (suit in suits) {
  for (value in values) {
    deck.push(`${suits[suit]}${values[value]}`);
  }
}
// Game state
let playerOneDeck = [];
let playerOnePlayed;
let playerTwoDeck = [];
let playerTwoPlayed;
let turn;
let winner;

/// cached elements
const shuffleBtn = document.querySelector("#shuffle"); // Shuffle button-shuffles deck
// Player decks and active cards
const playerOneDeckEl = document.getElementById("playerOneDeck");
const activeCardOneEl = document.getElementById("activeCardOne");
const activeCardTwoEl = document.getElementById("activeCardTwo");
const playerTwoDeckEl = document.getElementById("playerTwoDeck");
// win or tie
const playerOneWinEl = document.getElementById("win1");
const playerTwoWinEl = document.getElementById("win2");
const itsATieEl = document.getElementById("tie");

// Turn
const playerTurnEl = document.getElementById("playerturn");

// Game menu
const gameMenuEl = document.querySelector(".game-menu");
const gameInstructionsEl = document.getElementById("game-instructions");
const enterButtonEl = document.getElementById("enterbtn");

// Event Listeners
shuffleBtn.addEventListener("click", initialize);
playerOneDeckEl.addEventListener("click", takeTurn);
playerTwoDeckEl.addEventListener("click", takeTurnTwo);
enterButtonEl.addEventListener("click", enterGame);

// Functions

//Enter game to initialize the game board
function enterGame() {
  gameInstructionsEl.style.display = "none";
  gameMenuEl.classList.remove("hide");
  initialize();
}
// Shuffles deck , sets two deck with 26 cards each, starts with player one turn
function initialize() {
  shuffleDeck();
  playerOneDeck = deck.slice(0, 26);
  playerOnePlayed = null;
  playerTwoDeck = deck.slice(26, 52);
  playerTwoPlayed = null;
  turn = "One";
  winner = null;
  render();
}

// shuffles deck , resets deck and highlights turn
function shuffleDeck() {
  let i = 0;
  j = 0;
  temp = null;
  for (i = deck.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  if (winner === "One" || winner === "Two" || winner === "tie") {
    shuffleBtn.style.backgroundColor = "#4CAF50";
    playerOneWinEl.innerHTML = "";
    playerTwoWinEl.innerHTML = "";
    itsATieEl.innerText = "";
    playerOnePlayed = "";
    playerTwoPlayed = "";
    winner = "";
    turn = "One";
  }
  highlightPlayerTurn();
}

//compares values of cards played
function cardsAreEqual() {
  let valOne = null;
  let valTwo = null;
  if (playerOnePlayed) {
    valOne = playerOnePlayed.slice(-2);
  }
  if (playerTwoPlayed) {
    valTwo = playerTwoPlayed.slice(-2);
  }
  return valOne === valTwo;
}

//highlights active player's deck
function highlightPlayerTurn() {
  if (turn === "" || winner) {
    playerOneDeckEl.style.border = "";
    playerTwoDeckEl.style.border = "";
    playerTurnEl.innerText = "";
  } else if (turn === "One") {
    playerTwoDeckEl.style.border = "";
    playerOneDeckEl.style.border = "5px solid red";
    playerTurnEl.innerText = "Player One's Turn";
  } else if (turn === "Two") {
    playerOneDeckEl.style.border = "";
    playerTwoDeckEl.style.border = "5px solid red";
    playerTurnEl.innerText = "Player Two's Turn";
  } else {
    playerOneDeckEl.style.border = "";
    playerTwoDeckEl.style.border = "";
    playerTurnEl.innerText = "";
  }
}

// determines player 1 win  or tie ; switches turn; highlights active card
function takeTurn() {
  if (turn === "Two" || winner) return;
  playerOnePlayed = playerOneDeck.shift();
  if (cardsAreEqual()) {
    playerOneWinEl.innerHTML = "Player 1 Wins !";
    winner = "One";
  }
  turn = "Two";
  highlightPlayerTurn();
  render();
}

// determines player 2 win or tie ; switches turn; highlights active card
function takeTurnTwo() {
  if (turn === "One" || winner) return;
  playerTwoPlayed = playerTwoDeck.shift();
  if (cardsAreEqual()) {
    playerTwoWinEl.innerText = "Player 2 Wins !";
    winner = "Two";
  }
  if (playerTwoDeck.length === 0) {
    winner = "Tie";
  }
  turn = "One";
  highlightPlayerTurn();
  render();
}
// displays the  Active card by adding classlist and text from the card in the deck ; decides if tie
function render() {
  activeCardOneEl.className = "card xlarge";
  activeCardTwoEl.className = "card xlarge";

  if (playerOnePlayed) {
    activeCardOneEl.classList.add(playerOnePlayed);
    activeCardOneEl.textContent = playerOnePlayed;
  }

  if (playerTwoPlayed) {
    activeCardTwoEl.classList.add(playerTwoPlayed);
    activeCardTwoEl.textContent = playerTwoPlayed;
  }

  if (winner) {
    if (winner === "Tie") {
      itsATieEl.innerText = "Its a tie !";
    } else {
      shuffleBtn.style.backgroundColor = "red";
    }
  }
}
