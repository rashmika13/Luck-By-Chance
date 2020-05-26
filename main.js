//constants
const suits = ['h', 'c', 'd', 's'];
const values  = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13'];

let deck = [];

for (suit in suits) {
    for (value in values) {
        deck.push(`${suits[suit]}${values[value]}`) 
    }
}
// Game state 
let playerOneDeck = [];
let playerOnePlayed;
let playerTwoDeck = [];
let playerTwoPlayed;
let turn 
let winner

// cached elements
const shuffleBtn = document.querySelector('#shuffle')
const activeCardOneEl = document.getElementById('activeCardOne')
const activeCardTwoEl = document.getElementById('activeCardTwo')
const playerOneDeckEl = document.getElementById('playerOneDeck')
const playerTwoDeckEl = document.getElementById('playerTwoDeck')
const playerOneWinEl = document.getElementById('win1')
const playerTwoWinEl = document.getElementById('win2')
const itsATieEl = document.getElementById('tie')
const blinkEl = document.getElementById('blink')

// Event Listeners
shuffleBtn.addEventListener('click', initialize)
playerOneDeckEl.addEventListener('click', takeTurn)
playerTwoDeckEl.addEventListener('click', takeTurnTwo)


  

// Functions
initialize()

function blinkEl(btn1) {
    btn1.removeClass();
    btn1.addClass("highlight");
    setTimeout(function () { blink2(btn1); }, 750);
}

function initialize() {
    shuffleDeck()
    playerOneDeck = deck.slice(0, 26)
    playerOnePlayed = null
    playerTwoDeck = deck.slice(26, 52)
    playerTwoPlayed = null
    turn = 'One'
    winner = null

    render()
}

function shuffleDeck() {
let  i = 0
     j = 0
    temp = null
  for (i = deck.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    temp = deck[i]
    deck[i] = deck[j]
    deck[j] = temp
  }
}

function cardsAreEqual() {
    let valOne = null
    let valTwo = null
    if (playerOnePlayed) {
        valOne = playerOnePlayed.slice(-2)
    }
    if (playerTwoPlayed) {
        valTwo = playerTwoPlayed.slice(-2)
    }
    return valOne === valTwo
}

function takeTurn() {
    if (turn === 'Two' || winner) return
    playerOnePlayed = playerOneDeck.shift() 
    if (cardsAreEqual()) {
        playerOneWinEl.innerText= "Player 1 Wins !"
        winner = 'One'
    }
    turn = 'Two'
    render()
} 

function takeTurnTwo () {
    if (turn === 'One' || winner) return
    playerTwoPlayed = playerTwoDeck.shift()
    if (cardsAreEqual()) {
        playerTwoWinEl.innerText= "Player 2 Wins !"
        winner = 'Two'
    }
    if (playerTwoDeck.length === 0) {
        winner = 'Tie'
    }
    turn = 'One'
    render ()
} 


function render() {
    activeCardOneEl.className = 'card'
    activeCardTwoEl.className = 'card'
  
    if (playerOnePlayed) {
      activeCardOneEl.classList.add(playerOnePlayed)
      activeCardOneEl.textContent = playerOnePlayed
    }
  
    if (playerTwoPlayed) {
      activeCardTwoEl.classList.add(playerTwoPlayed)
      activeCardTwoEl.textContent = playerTwoPlayed
    }

    if (winner) {
        if (winner === 'Tie') {
            itsATieEl.innerText = "Its a tie !"
        } else {
            shuffleBtn.style.backgroundColor = "red"
        }
    }
}


