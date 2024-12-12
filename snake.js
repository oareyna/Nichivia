const boardWidth = 50;
const boardHeight = 50;
const tileSize = 25;
let snake = [{ x: 12, y: 12 }];
let direction = { x: 0, y: 0 };
let apple = null;
let gameBoard = [];
let gameInterval = null; // Store the interval for the game loop
let moveCount = 0; // Counter for the number of moves
let bombs = []; // Store bomb positions
let bombTimers = {}; // Store timers for each bomb to manage explosion delay

const board = document.getElementById('game-board');

// Initialize the game board with walls and empty spaces
function initGameBoard() {
  for (let y = 0; y < boardHeight; y++) {
    const row = [];
    for (let x = 0; x < boardWidth; x++) {
      if (x === 0 || y === 0 || x === boardWidth - 1 || y === boardHeight - 1) {
        row.push(2); // Walls on the outer edges
      } else {
        row.push(0); // Empty spaces inside the grid
      }
    }
    gameBoard.push(row);
  }
  renderBoard();
}

// Render the game board
function renderBoard() {
  board.innerHTML = ''; // Clear the board each time it's rendered
  gameBoard.forEach((row, y) => {
    row.forEach((tile, x) => {
      const div = document.createElement('div');
      div.classList.add('tile');
      if (tile === 2) {
        div.classList.add('tile-wall');
      } else if (tile === 0) {
        div.classList.add('tile-empty');
      } else if (tile === 1) {
        div.classList.add('tile-snake');
      } else if (tile === 3) {
        div.classList.add('tile-apple');
      } else if (tile === 4) {
        div.classList.add('tile-bomb'); // Bomb tile class
      }
      board.appendChild(div);
    });
  });
}

// Start the game
function startGame() {
  initGameBoard();
  spawnApple();
  spawnBombs();
  document.addEventListener('keydown', changeDirection);
  // Start the game loop
  gameInterval = setTimeout(gameLoop, 150);
}

// Game loop - move the snake, check for collisions, and render the board
function gameLoop() {
  moveSnake();
  checkCollisions();
  renderBoard();
  gameInterval = setTimeout(gameLoop, 150); // Ensure the interval is set again for smooth movement
}

// Change snake direction based on arrow keys
function changeDirection(event) {
  if (event.key === 'ArrowUp' && direction.y === 0) {
    direction = { x: 0, y: -1 };
  } else if (event.key === 'ArrowDown' && direction.y === 0) {
    direction = { x: 0, y: 1 };
  } else if (event.key === 'ArrowLeft' && direction.x === 0) {
    direction = { x: -1, y: 0 };
  } else if (event.key === 'ArrowRight' && direction.x === 0) {
    direction = { x: 1, y: 0 };
  }
}

// Move the snake based on the current direction
function moveSnake() {
  const head = { ...snake[0] };
  head.x += direction.x;
  head.y += direction.y;
  snake.unshift(head); // Add new head to the front of the snake

  moveCount++; // Increment the move count
  if (moveCount >= 10) {
    spawnBombs(); // Spawn new bombs every 10 moves
    moveCount = 0; // Reset move count
  }

  if (head.x === apple.x && head.y === apple.y) {
    spawnApple(); // Eat apple and spawn a new one
    gameBoard[head.y][head.x] = 1; // Mark the new head position
  } else {
    const tail = snake.pop(); // Remove tail
    gameBoard[tail.y][tail.x] = 0; // Clear the tail
    gameBoard[head.y][head.x] = 1; // Mark the new head position
  }
}

// Spawn an apple at a random empty space
function spawnApple() {
  let appleX, appleY;
  do {
    appleX = Math.floor(Math.random() * (boardWidth - 2)) + 1;
    appleY = Math.floor(Math.random() * (boardHeight - 2)) + 1;
  } while (gameBoard[appleY][appleX] !== 0); // Ensure apple spawns in an empty space
  apple = { x: appleX, y: appleY };
  gameBoard[appleY][appleX] = 3; // Place the apple on the board
}

// Spawn bombs randomly every 10 moves
function spawnBombs() {
  let bombX, bombY;
  const bombCount = 3; // Number of bombs to spawn at once
  for (let i = 0; i < bombCount; i++) {
    do {
      bombX = Math.floor(Math.random() * (boardWidth - 2)) + 1;
      bombY = Math.floor(Math.random() * (boardHeight - 2)) + 1;
    } while (gameBoard[bombY][bombX] !== 0); // Ensure bombs spawn on empty spaces
    gameBoard[bombY][bombX] = 4; // Mark bomb on the board
    bombs.push({ x: bombX, y: bombY });
  }
}

// Handle bomb explosion (affects a 10x10 area)
function explodeBomb(bomb) {
  // Start a timer for the explosion
  bombTimers[`${bomb.x},${bomb.y}`] = setTimeout(() => {
    // Larger explosion area (10x10 grid)
    for (let y = bomb.y - 5; y <= bomb.y + 5; y++) {
      for (let x = bomb.x - 5; x <= bomb.x + 5; x++) {
        if (x >= 0 && x < boardWidth && y >= 0 && y < boardHeight) {
          if (gameBoard[y][x] === 1) { // If there's a snake part
            alert('Game Over! The bomb exploded!');
            resetGame(); // Reset the game if the snake hits a bomb
          }
          gameBoard[y][x] = 0; // Clear the tiles in the explosion area
        }
      }
    }
    renderBoard(); // Render the board after the explosion
  }, 1000); // Bomb will explode after 1 second
}

// Check for collisions with walls, self, or bombs
function checkCollisions() {
  const head = snake[0];

  // Wall collision
  if (head.x === 0 || head.y === 0 || head.x === boardWidth - 1 || head.y === boardHeight - 1) {
    alert('Game Over! You hit a wall.');
    resetGame();
  }

  // Self collision
  if (snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
    alert('Game Over! You ran into yourself.');
    resetGame();
  }

  // Bomb collision: Start timer to explode bomb
  bombs.forEach(bomb => {
    if (head.x === bomb.x && head.y === bomb.y) {
      // Trigger bomb explosion immediately upon collision
      explodeBomb(bomb);
    }
  });
}

// Reset the game
function resetGame() {
  // Clear the current game interval if there is one
  clearTimeout(gameInterval);

  // Clear bomb timers to stop explosions
  for (let timer in bombTimers) {
    clearTimeout(bombTimers[timer]);
  }

  // Reset game state
  snake = [{ x: 12, y: 12 }];
  direction = { x: 0, y: 0 };
  gameBoard = [];
  bombs = []; // Clear bomb data
  bombTimers = {}; // Clear bomb timers
  startGame(); // Restart the game
}

startGame();
