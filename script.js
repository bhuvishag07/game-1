const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const playAgainBtn = document.getElementById("play-again-btn");

const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const gameOverScreen = document.getElementById("game-over-screen");

const puzzle = document.getElementById("puzzle");
const movesDisplay = document.getElementById("moves");
const timeDisplay = document.getElementById("time");
const finalMoves = document.getElementById("final-moves");
const finalTime = document.getElementById("final-time");

let tiles = [];
let moves = 0;
let time = 0;
let timer;

function startGame() {
  startScreen.classList.remove("active");
  gameOverScreen.classList.remove("active");
  gameScreen.classList.add("active");

  moves = 0;
  time = 0;
  movesDisplay.textContent = moves;
  timeDisplay.textContent = time;

  clearInterval(timer);
  timer = setInterval(() => {
    time++;
    timeDisplay.textContent = time;
  }, 1000);

  createTiles();
}

function createTiles() {
  puzzle.innerHTML = "";
  tiles = [...Array(15).keys()].map(x => x + 1);
  tiles.push(null);

  shuffleTiles();

  tiles.forEach((number, index) => {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    if (number === null) {
      tile.classList.add("empty");
    } else {
      tile.textContent = number;
      tile.addEventListener("click", () => moveTile(index));
    }
    puzzle.appendChild(tile);
  });
}

function shuffleTiles() {
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
}

function moveTile(index) {
  const emptyIndex = tiles.indexOf(null);

  const validMoves = [
    emptyIndex - 1,
    emptyIndex + 1,
    emptyIndex - 4,
    emptyIndex + 4
  ];

  if (validMoves.includes(index)) {
    [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
    moves++;
    movesDisplay.textContent = moves;
    createTiles();
    checkWin();
  }
}

function checkWin() {
  for (let i = 0; i < 15; i++) {
    if (tiles[i] !== i + 1) return;
  }

  clearInterval(timer);
  gameScreen.classList.remove("active");
  gameOverScreen.classList.add("active");
  finalMoves.textContent = moves;
  finalTime.textContent = time;
}

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);
playAgainBtn.addEventListener("click", startGame);
