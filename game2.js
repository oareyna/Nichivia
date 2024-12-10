const boardSize = 4;
const gridContainer = document.querySelector('.grid');
const scoreElement = document.querySelector('.score');
const gameOverElement = document.querySelector('.game-over');

let board = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
];

// board = [
//     [1024, 1024, 1024, 1024],
//     [1024, 1024, 1024, 1024],
//     [1024, 1024, 1024, 1024],
//     [1024, 1024, 1024, 1024],
// ]

let score = 0;
let bombTimeout = null;
let bombPosition = null;
let bombTimer = null;

function generateRandomTile() {
  const emptyCells = [];

  // Find all empty cells
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (board[i][j] == 0) { // Using == here
        emptyCells.push([i, j]);
      }
    }
  }

  if (emptyCells.length == 0) return;

  // Pick a random empty cell and place a 2 or 4
  const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  board[row][col] = Math.random() > 0.1 ? 2 : 4;

  renderBoard();
}

function spawnBomb() {
    // Randomly choose a position for the bomb (it can spawn anywhere)
    const row = Math.floor(Math.random() * boardSize);
    const col = Math.floor(Math.random() * boardSize);
    
    // Place the bomb on the chosen position
    board[row][col] = 'B'; // 'B' represents the bomb
  
    bombPosition = [row, col];
  
    // Wait 3 seconds before exploding
    bombTimer = setTimeout(explodeBomb, 1500);
  
    renderBoard();
  
    // Randomly spawn a bomb every 35-45 seconds
    bombTimeout = setTimeout(spawnBomb, Math.random() * (10000 - 5000) + 2500);
  }
  
  function explodeBomb() {
    const [row, col] = bombPosition;
  
    // Explosion pattern in an "L" shape
    const explosionCoords = [
      [row, col],        // Center of the bomb
      [row + 1, col],    // Vertical part of the L
      [row + 2, col],    // Vertical part of the L
      [row, col + 1],    // Horizontal part of the L
      [row, col + 2],     // Horizontal part of the L
      [row + 1, col + 2],
      [row + 2, col + 1]
    ];
  
    // Remove any existing tiles within the explosion radius
    explosionCoords.forEach(([r, c]) => {
      if (r >= 0 && r < boardSize && c >= 0 && c < boardSize) {
        board[r][c] = 0; // Remove tile in the explosion area
      }
    });
  
    // Remove all bombs ('B') on the board and set them to 0
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        if (board[i][j] === 'B') {
          board[i][j] = 0; // Remove the bomb
        }
      }
    }
  
    // Render the board after the explosion
    renderBoard();
  }
  

function renderBoard() {
  gridContainer.innerHTML = '';

  // Loop through each row and cell on the board
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      
      // If the cell has a tile, display it
      if (board[i][j] != 0) { // Using != here
        if (board[i][j] == 'B') {
          tile.classList.add('tile-bomb'); // Add bomb class
        } else {
          tile.textContent = board[i][j];
          tile.classList.add(`tile-${board[i][j]}`);
        }
      }

      // Append the tile to the grid container
      gridContainer.appendChild(tile);
    }
  }

  scoreElement.textContent = `Score: ${score}`;
}

function slideAndMergeLine(line) {
  let newLine = [];

  // Remove all zeros (slide non-zero tiles to the left)
  for (let i = 0; i < line.length; i++) {
    if (line[i] != 0) { // Using != here
      newLine.push(line[i]);
    }
  }

  // Merge tiles of the same value
  for (let i = 0; i < newLine.length - 1; i++) {
    if (newLine[i] == newLine[i + 1]) { // Using == here
      newLine[i] *= 2; // Double the tile value
      score += newLine[i]; // Add to the score
      newLine.splice(i + 1, 1); // Remove the merged tile
    }
  }

  // Fill the remaining space with zeros
  while (newLine.length < boardSize) {
    newLine.push(0);
  }

  return newLine;
}

function move(direction) {
  let moved = false;

  // Handle moving up and down (column-wise)
  if (direction == 'up' || direction == 'down') { // Using == here
    for (let col = 0; col < boardSize; col++) {
      let column = [];

      // Extract the column into a 1D array
      for (let row = 0; row < boardSize; row++) {
        column.push(board[row][col]);
      }

      if (direction == 'down') { // Using == here
        column.reverse(); // Reverse the column for downward movement
      }

      // Slide and merge the column
      let newColumn = slideAndMergeLine(column);

      if (direction == 'down') { // Using == here
        newColumn.reverse(); // Reverse the column back to original order
      }

      // Update the board with the new column
      for (let row = 0; row < boardSize; row++) {
        if (board[row][col] != newColumn[row]) { // Using != here
          moved = true;
        }
        board[row][col] = newColumn[row];
      }
    }
  }

  // Handle moving left and right (row-wise)
  else if (direction == 'left' || direction == 'right') { // Using == here
    for (let row = 0; row < boardSize; row++) {
      if (direction == 'right') { // Using == here
        board[row].reverse(); // Reverse the row for rightward movement
      }

      // Slide and merge the row
      let newRow = slideAndMergeLine(board[row]);

      if (direction == 'right') { // Using == here
        newRow.reverse(); // Reverse the row back to original order
      }

      // Update the board with the new row
      if (JSON.stringify(board[row]) != JSON.stringify(newRow)) { // Using != here
        moved = true;
      }
      board[row] = newRow;
    }
  }

  // If a move happened, generate a new random tile
  if (moved) {
    generateRandomTile();
    checkGameOver();
    setTimeout(check2048, 1500)
  }
}

function checkGameOver() {
  // Check if there are any empty spaces or possible moves left
  let gameOver = true;

  // Check for empty spaces
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (board[i][j] == 0) { // If there's an empty space
        gameOver = false;
      }
    }
  }

  // Check for adjacent tiles that can merge
  if (gameOver) {
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        if (i < boardSize - 1 && board[i][j] == board[i + 1][j]) { // Check for vertical merges
          gameOver = false;
        }
        if (j < boardSize - 1 && board[i][j] == board[i][j + 1]) { // Check for horizontal merges
          gameOver = false;
        }
      }
    }
  }

  if (gameOver) {
    gameOverElement.style.display = 'block'; // Show game over screen
  }
}

document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
  const key = event.key;

  if (key == 'ArrowUp' || key == 'w') { // Using == here
    move('up');
  } else if (key == 'ArrowDown' || key == 's') { // Using == here
    move('down');
  } else if (key == 'ArrowLeft' || key == 'a') { // Using == here
    move('left');
  } else if (key == 'ArrowRight' || key == 'd') { // Using == here
    move('right');
  }
}

// Handle the 2048 win condition
let hasWon = false
function check2048() {
    if (hasWon) return;  // If the player has already won, don't show the prompt again
  
    let has2048 = false;
  
    // Check if any tile has the value 2048
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        if (board[i][j] == 2048) {
          has2048 = true;
          break; // Stop searching once we find 2048
        }
      }
      if (has2048) break; // Exit outer loop as well if we found 2048
    }
  
    // If the player has achieved 2048, prompt them to continue or not
    if (has2048) {
      hasWon = true; // Set the flag to true to prevent further prompts
      console.log("Player has won with 2048!");
      const shouldContinue = window.confirm("You won! Do you want to continue playing?");
      if (!shouldContinue) {
        window.location.href = "/main.html"; // Redirect to another page if they don't want to continue
      }
    }
  }
  

// Start the game by generating two tiles and starting the bomb timer
generateRandomTile();
generateRandomTile();
spawnBomb(); // Start the bomb timer immediately
