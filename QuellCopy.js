// Manually define the 5 levels as 2D arrays
let input = prompt("Scroll? (this will determine if you can win or lose)")
console.log(input)
let HahaTroll = input == 'down' ? 0 : 6
let boards = [
  [  // Level 1
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 0, 2, 0, 0, 0, 0, 0, 4, 0, 0, 3, 1, 1],
    [1, 1, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 0, 0, 0, 0, 6, 6, 6, 6, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 6, 6, 6, 0, 0, 0, 0, 1, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 6, 6, 0, 5, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 6, 6, 6, 0, 5, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 6, 6, 0, 5, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  [  // Level 2 (copy of level 1, can be modified later)
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 6, 0, 0, 0, 1, 6, 6, 6, 0, 0, 1, 1, 0, 1],
    [1, 6, 0, 1, 0, HahaTroll, 0, 0, 0, 0, 1, 0, 3, 0, 1],
    [1, 6, 0, 6, 0, 0, 0, 0, 6, 0, 0, 0, 0, 6, 1],
    [1, 6, 0, 6, 0, 0, 1, 0, 0, 0, 0, 0, 0, 6, 1],
    [1, 6, 0, 6, 1, 0, 0, 1, 0, 0, 1, 0, 0, 6, 1],
    [1, 6, 0, 1, 6, 1, 0, 0, 1, 0, 0, 0, 1, 6, 1],
    [1, 6, 0, 6, 6, 6, 1, 0, 0, 0, 0, 0, 0, 6, 1],
    [1, 6, 0, 6, 6, 6, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 6, 0, 6, 6, 6, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 6, 0, 6, 6, 6, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 6, 2, 1, 0, 0, 6, 6, 0, 6, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  [  // Level 3 (copy of level 1, can be modified later)
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 2, 6, 0, 0, 0, 0, 0, 0, 0, 3, 1, 1],
    [1, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 6, 0, 0, 5, 5, 5, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 6, 6, 6, 6, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 1],
    [1, 6, 6, 6, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  [  // Level 4 (copy of level 1, can be modified later)
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 2, 6, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1],
    [1, 6, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 5, 1, 0, 6, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 5, 5, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1],
    [1, 5, 5, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1],
    [1, 1, 0, 0, 1, 6, 0, 1, 1, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 1, 5, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 6, 1],
    [1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 6, 6, 1],
    [1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 3, 0, 6, 6, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  [  // Level 5 (copy of level 1, can be modified later)
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 6, 1, 1, 1, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 0, 1, 6, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 6, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 6, 1, 1, 1, 1, 1, 1, 1, 0, 3, 6, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]
  // Levels 3, 4, and 5 can be similarly defined here.
];
const gameBoard = document.getElementById("game-board");
const levelDisplay = document.getElementById("level");
const nextLevelButton = document.getElementById("next-level");

let playerPosition = { x: 1, y: 1 };  // Default position for initialization
let currentLevel = 1;
let isMoving = false; // Flag to prevent direction change during movement

const tileTypes = {
  GROUND: 0,
  WALL: 1,
  PLAYER: 2,
  GOAL: 3,
  TURRET: 4,
  MELEE: 5,
  LAVA: 6,
};

// Function to find and set the initial player position based on the PLAYER tile
function findPlayerPosition() {
  const board = boards[currentLevel - 1];
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      if (board[y][x] === tileTypes.PLAYER) {
        playerPosition = { x, y }; // Set the player position
        return;
      }
    }
  }
}

// Function to initialize enemy mechanics
// Function to initialize enemy mechanics
function initializeEnemyMechanics() {
    const board = boards[currentLevel - 1];
    
    // Clear any existing intervals
    if (window.intervalIds) {
      window.intervalIds.forEach(clearInterval);
      window.intervalIds = [];
    }
    
    // Find and set up melee enemies
    const meleeEnemies = [];
    const turrets = [];
    
    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board[y].length; x++) {
        if (board[y][x] === tileTypes.MELEE) {
          meleeEnemies.push({ x, y });
        }
        if (board[y][x] === tileTypes.TURRET) {
          turrets.push({ x, y });
        }
      }
    }
    
    // Initialize window.intervalIds if it doesn't exist
    window.intervalIds = window.intervalIds || [];
    
    // Set up melee attack mechanic
    meleeEnemies.forEach(enemy => {
      const intervalId = setInterval(() => {
        checkMeleeAttack(enemy.x, enemy.y);
      }, 2500); // Attack every 2.5 seconds
  
      window.intervalIds.push(intervalId);
    });
    
    // Set up turret shooting mechanics
    turrets.forEach(turret => {
      // Shoot in four directions
      const directions = [
        { dx: 0, dy: -1 },  // Up
        { dx: 0, dy: 1 },   // Down
        { dx: -1, dy: 0 },  // Left
        { dx: 1, dy: 0 }    // Right
      ];
      
      const intervalId = setInterval(() => {
        directions.forEach(dir => {
          shootInDirection(turret.x, turret.y, dir.dx, dir.dy);
        });
      }, 3000); // Shoot every 3 seconds
      
      window.intervalIds.push(intervalId);
    });
}

// Turret shooting logic
function shootInDirection(startX, startY, dx, dy) {
  let currentX = startX + dx;
  let currentY = startY + dy;
  const board = boards[currentLevel - 1];
  
  while (currentX >= 0 && currentX < board[0].length && 
         currentY >= 0 && currentY < board.length) {
    // Stop if hit a wall
    if (board[currentY][currentX] === tileTypes.WALL) {
      break;
    }
    
    // Check if player is in the line of fire
    if (currentX === playerPosition.x && currentY === playerPosition.y) {
      gameOver();
      return;
    }
    
    // Move to next tile in direction
    currentX += dx;
    currentY += dy;
  }
}

// Turret shooting logic
function shootInDirection(startX, startY, dx, dy) {
  let currentX = startX + dx;
  let currentY = startY + dy;
  const board = boards[currentLevel - 1];
  
  while (currentX >= 0 && currentX < board[0].length && 
         currentY >= 0 && currentY < board.length) {
    // Stop if hit a wall
    if (board[currentY][currentX] === tileTypes.WALL) {
      break;
    }
    
    // Check if player is in the line of fire
    if (currentX === playerPosition.x && currentY === playerPosition.y) {
      gameOver();
      return;
    }
    
    // Move to next tile in direction
    currentX += dx;
    currentY += dy;
  }
}

// Melee attack logic
function checkMeleeAttack(enemyX, enemyY) {
  // Check 3x3 area around the melee enemy
  for (let y = enemyY - 1; y <= enemyY + 1; y++) {
    for (let x = enemyX - 1; x <= enemyX + 1; x++) {
      // Check if player is in the attack area
      if (x === playerPosition.x && y === playerPosition.y) {
        gameOver();
        return;
      }
    }
  }
}


// Function to render the board
function renderBoard() {
    const board = boards[currentLevel - 1];
    gameBoard.innerHTML = '';  // Clear previous board
  function initializeEnemyMechanics() {
    const board = boards[currentLevel - 1];
    // Find and set up melee enemies
    const meleeEnemies = [];
    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board[y].length; x++) {
        if (board[y][x] === tileTypes.MELEE) {
          meleeEnemies.push({ x, y });
        }
      }
    }
    
    // Set up melee attack mechanic
    meleeEnemies.forEach(enemy => {
      const intervalId = setInterval(() => {
        checkMeleeAttack(enemy.x, enemy.y);
      }, 2500); // Attack every 2.5 seconds
  
      // Store interval IDs to allow clearing them later
      window.intervalIds = window.intervalIds || [];
      window.intervalIds.push(intervalId);
    });
  }
  
  // Loop through the board and render each tile
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      const tile = document.createElement('div');
      tile.classList.add('tile');

      // Set the class based on the tile type
      switch (board[y][x]) {
        case tileTypes.WALL:
          tile.classList.add('tile-wall');
          break;
        case tileTypes.GROUND:
          tile.classList.add('tile-ground');
          break;
        case tileTypes.GOAL:
          tile.classList.add('tile-goal');
          break;
        case tileTypes.TURRET:
          tile.classList.add('tile-turret');
          break;
        case tileTypes.MELEE:
          tile.classList.add('tile-melee');
          break;
        case tileTypes.LAVA:
          tile.classList.add('tile-lava');
          break;
        default:
          tile.classList.add('tile-ground'); // Set unused tiles to ground
          break;
      }

      // Add tile to the game board
      gameBoard.appendChild(tile);
    }
  }

  // Render the player tile after the board is set up
  const playerTile = document.createElement('div');
  playerTile.classList.add('tile', 'tile-player'); // Add the player class

  // Calculate the index for where to place the player based on position
  const playerTileElement = gameBoard.children[playerPosition.y * 15 + playerPosition.x];
  playerTileElement.appendChild(playerTile);  // Append the player inside the correct grid tile

  levelDisplay.textContent = `Level ${currentLevel}`;
  initializeEnemyMechanics();
}
let canMove = true; // Flag to control player movement

// Function to move the player continuously in a direction until they hit a wall or the goal
// Enhanced movement and game mechanics
function movePlayer(direction) {
    if (!canMove) {
      return; // Stop movement if the player cannot move
    }
  
    const board = boards[currentLevel - 1];
    let nextX = playerPosition.x;
    let nextY = playerPosition.y;
    
    // Determine the next position based on direction
    switch (direction) {
      case 'up':
        nextY--;
        break;
      case 'down':
        nextY++;
        break;
      case 'left':
        nextX--;
        break;
      case 'right':
        nextX++;
        break;
    }
    
    // Check if the next position is valid and not a wall
    if (board[nextY] && board[nextY][nextX] !== tileTypes.WALL) {
      // Check for special tile interactions
      switch(board[nextY][nextX]) {
        case tileTypes.GOAL:
          playerPosition = { x: nextX, y: nextY }; 
          renderBoard(); 
          nextLevelButton.style.display = 'block';
          isMoving = false;
          canMove = false;
          return;
        
        case tileTypes.TURRET:
          // Game over - turret shoots player
          gameOver();
          return;
        
        case tileTypes.MELEE:
          // Game over - melee enemy kills player
          gameOver();
          return;
        
        case tileTypes.LAVA:
          // Game over - player falls into lava
          gameOver();
          return;
      }
    
      playerPosition = { x: nextX, y: nextY }; // Update player position
      renderBoard(); // Re-render the board with the new player position
    
      // If the player has not hit a wall, keep moving in the same direction
      if (board[nextY][nextX] !== tileTypes.WALL) {
        setTimeout(() => {
          movePlayer(direction);
        }, 150);
      } else {
        isMoving = false;
      }
    } else {
      isMoving = false;
    }
  }
  
  // Game over function to handle player death
  function gameOver() {
    // Create a game over overlay
    const gameOverOverlay = document.createElement('div');
    gameOverOverlay.style.position = 'fixed';
    gameOverOverlay.style.top = '0';
    gameOverOverlay.style.left = '0';
    gameOverOverlay.style.width = '100%';
    gameOverOverlay.style.height = '100%';
    gameOverOverlay.style.backgroundColor = 'rgba(0,0,0,0.7)';
    gameOverOverlay.style.display = 'flex';
    gameOverOverlay.style.flexDirection = 'column';
    gameOverOverlay.style.justifyContent = 'center';
    gameOverOverlay.style.alignItems = 'center';
    gameOverOverlay.style.color = 'white';
    gameOverOverlay.style.zIndex = '1000';
    
    // Game over text
    const gameOverText = document.createElement('h1');
    gameOverText.textContent = 'Game Over';
    gameOverText.style.fontSize = '3rem';
    gameOverText.style.marginBottom = '20px';
    
    // Restart button
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart Level';
    restartButton.style.padding = '10px 20px';
    restartButton.style.fontSize = '1.2rem';
    restartButton.style.cursor = 'pointer';
    
    // Restart functionality
    restartButton.addEventListener('click', () => {
      // Reset the current level
      findPlayerPosition();
      renderBoard();
      gameOverOverlay.remove();
      canMove = true;
      isMoving = false;
    });
    
    // Append elements
    gameOverOverlay.appendChild(gameOverText);
    gameOverOverlay.appendChild(restartButton);
    document.body.appendChild(gameOverOverlay);
    
    // Stop player movement
    canMove = false;
    isMoving = false;
  }
  
  // Modify the renderBoard function to distinguish visual styles for special tiles
  function renderBoard() {
    const board = boards[currentLevel - 1];
    gameBoard.innerHTML = '';  // Clear previous board
  
    // Loop through the board and render each tile
    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board[y].length; x++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
  
        // Set the class based on the tile type
        switch (board[y][x]) {
          case tileTypes.WALL:
            tile.classList.add('tile-wall');
            break;
          case tileTypes.GROUND:
            tile.classList.add('tile-ground');
            break;
          case tileTypes.GOAL:
            tile.classList.add('tile-goal');
            break;
          case tileTypes.TURRET:
            tile.classList.add('tile-turret');
            // Optional: Add a unique turret appearance
            tile.innerHTML = '🔫'; // Turret emoji
            break;
          case tileTypes.MELEE:
            tile.classList.add('tile-melee');
            tile.innerHTML = '👾'; // Alien/enemy emoji
            break;
          case tileTypes.LAVA:
            tile.classList.add('tile-lava');
            tile.style.animation = 'lavaFlow 2s infinite alternate';
            break;
          default:
            tile.classList.add('tile-ground'); // Set unused tiles to ground
            break;
        }
  
        // Add tile to the game board
        gameBoard.appendChild(tile);
      }
    }
  
    // Render the player tile after the board is set up
    const playerTile = document.createElement('div');
    playerTile.classList.add('tile', 'tile-player'); // Add the player class
  
    // Calculate the index for where to place the player based on position
    const playerTileElement = gameBoard.children[playerPosition.y * 15 + playerPosition.x];
    playerTileElement.appendChild(playerTile);  // Append the player inside the correct grid tile
  
    levelDisplay.textContent = `Level ${currentLevel}`;
  }
  
  // Optional: Add a CSS animation for lava
  const lavaStyle = document.createElement('style');
  lavaStyle.textContent = `
  @keyframes lavaFlow {
    from { background-color: orange; }
    to { background-color: red; }
  }
  `;
  document.head.appendChild(lavaStyle);
  

// Event listener for key presses to move the player
document.addEventListener('keydown', (event) => {
  if (!isMoving) {  // Prevent changing direction while moving
    if (event.key === 'ArrowUp') {
      isMoving = true;
      movePlayer('up');
    }
    if (event.key === 'ArrowDown') {
      isMoving = true;
      movePlayer('down');
    }
    if (event.key === 'ArrowLeft') {
      isMoving = true;
      movePlayer('left');
    }
    if (event.key === 'ArrowRight') {
      isMoving = true;
      movePlayer('right');
    }
  }
});

// Set up the next level button
// Modify next level button to clear any existing enemy intervals
nextLevelButton.addEventListener('click', () => {
    // Clear any existing intervals before changing levels
    const intervals = window.intervalIds || [];
    intervals.forEach(clearInterval);

    if (currentLevel < 5) {
        currentLevel++;
        nextLevelButton.style.display = 'none';
        canMove = true;
        isMoving = false;
        findPlayerPosition();
        renderBoard();
    } else {
      window.location.href = 'index.html';
    }
  });

// Initialize the game
findPlayerPosition();  // Set the initial player position
renderBoard();  // Render the first level
