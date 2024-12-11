const boardWidth = 8;
const boardHeight = 6;
const gridContainer = document.querySelector('.grid');
const scoreElement = document.querySelector('.score');
const gameOverElement = document.querySelector('.game-over');

// Initial Board setup
let board = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
];

// Player, Cop, and Exit positions
let player = { x: 0, y: 0 }; // Start at top-left corner
let cop = { x: 7, y: 5 };    // Start at bottom-right corner
let exit = { x: 3, y: 3 };   // Set the exit at (3, 3)

let playerMoves = 0;  // Track the number of player moves
let gameOver = false; // Flag for game over state

// Function to update the board and display it
function updateBoard() {
  gridContainer.innerHTML = ''; // Clear the grid

  for (let y = 0; y < boardHeight; y++) {
    for (let x = 0; x < boardWidth; x++) {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      if (x === player.x && y === player.y) {
        tile.classList.add('tile-player');
        tile.textContent = 'P'; // Display "P" for Player
      } else if (x === cop.x && y === cop.y) {
        tile.classList.add('tile-cop');
        tile.textContent = 'C'; // Display "C" for Cop
      } else if (x === exit.x && y === exit.y) {
        tile.classList.add('tile-exit');
        tile.textContent = 'E'; // Display "E" for Exit
      }
      gridContainer.appendChild(tile);
    }
  }
}

// Function to move the player
function movePlayer(dx, dy) {
  if (gameOver) return; // Prevent movement if game is over

  // Calculate new position
  const newX = player.x + dx;
  const newY = player.y + dy;

  // Check if new position is within bounds
  if (newX >= 0 && newX < boardWidth && newY >= 0 && newY < boardHeight) {
    player.x = newX;
    player.y = newY;

    // Increment player moves
    playerMoves++;

    // Move exit every 2 player moves
    if (playerMoves % 2 === 0) {
      moveExit();
    }

    // Check for win condition
    if (player.x === exit.x && player.y === exit.y) {
      showWinScreen();
      return;
    }

    // Move cop towards player after player move
    moveCop();

    // Check for game over (cop catches player)
    if (cop.x === player.x && cop.y === player.y) {
      gameOver = true;
      gameOverElement.style.display = 'block';
    }

    updateBoard();
  }
}

// Function to move the exit (door) along the outer ring of the board
function moveExit() {
  // Define the outer ring positions (excluding corners)
  const outerRingPositions = [];

  // Top and bottom rows
  for (let i = 0; i < boardWidth; i++) {
    outerRingPositions.push({ x: i, y: 0 }); // Top row
    outerRingPositions.push({ x: i, y: boardHeight - 1 }); // Bottom row
  }

  // Left and right columns (excluding the already included corners)
  for (let i = 1; i < boardHeight - 1; i++) {
    outerRingPositions.push({ x: 0, y: i }); // Left column
    outerRingPositions.push({ x: boardWidth - 1, y: i }); // Right column
  }

  // Randomly pick a new position for the exit from the outer ring positions
  exit = outerRingPositions[Math.floor(Math.random() * outerRingPositions.length)];
}

// Function to set the player's starting position based on the exit
function setPlayerStartPosition() {
  // Player starts on the opposite side of the exit (only during game setup)
  if (exit.x === 0) {
    player = { x: boardWidth - 1, y: exit.y }; // Player on the right side
  } else if (exit.x === boardWidth - 1) {
    player = { x: 0, y: exit.y }; // Player on the left side
  } else if (exit.y === 0) {
    player = { x: exit.x, y: boardHeight - 1 }; // Player on the bottom side
  } else if (exit.y === boardHeight - 1) {
    player = { x: exit.x, y: 0 }; // Player on the top side
  }
}

// Function to move the cop towards the player
function moveCop() {
  // Calculate direction to move the cop towards the player
  let dx = 0, dy = 0;

  if (cop.x < player.x) dx = 1; // Cop moves right
  if (cop.x > player.x) dx = -1; // Cop moves left
  if (cop.y < player.y) dy = 1; // Cop moves down
  if (cop.y > player.y) dy = -1; // Cop moves up

  // Move cop twice
  if (dx !== 0) cop.x += dx;
  if (dy !== 0) cop.y += dy;
  
  if (dx !== 0) cop.x += dx;
  if (dy !== 0) cop.y += dy;
}

// Function to show the win screen
function showWinScreen() {
  window.location.href = 'win.html'; // Redirect to win page
}

// Keypress event listener for player movement
document.addEventListener('keydown', function(e) {
  if (gameOver) return; // Disable movement if game over

  if (e.key === 'ArrowUp') movePlayer(0, -1);
  if (e.key === 'ArrowDown') movePlayer(0, 1);
  if (e.key === 'ArrowLeft') movePlayer(-1, 0);
  if (e.key === 'ArrowRight') movePlayer(1, 0);
});

// Initial game setup
moveExit(); // Place exit at random outer position
setPlayerStartPosition(); // Set player on the opposite side of the exit
updateBoard();
