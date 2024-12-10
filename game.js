let player = document.getElementById('player');
let x = 0;
let y = 840;
let groundY = 895;  // The y position of the ground
let jumped = true;  // Track if the player is currently jumping
let velocityY = 10;  // The current upward/downward velocity
let jumpPower = 17.5;  // The power of the jump (higher = faster upward)
let gravityStrength = 0.65;  // The strength of gravity (lower = slower falling)
let wallLeft = 0;  // Left wall boundary
let wallRight = 1900;  // Right wall boundary (adjust for your screen width)



let doorX = 1825;
let doorY = 895;
let doorWidth = 100;
let doorHeight = 100;

let keys = {
  w: false,
  a: false,
  s: false,
  d: false,
};

// Initialize win and lose counts from sessionStorage (default to 0 if not set)
let winCount = sessionStorage.getItem('winCount') ? parseInt(sessionStorage.getItem('winCount')) : 0;
let loseCount = sessionStorage.getItem('loseCount') ? parseInt(sessionStorage.getItem('loseCount')) : 0;

// Update the displayed win and lose counts
function updateScore() {
  document.getElementById('winCount').innerText = 'Wins: ' + winCount;
  document.getElementById('loseCount').innerText = 'Losses: ' + loseCount;
}

// Handle keydown events to update key states
document.addEventListener('keydown', (event) => {
  if (event.key === 'w') {
    keys.w = true;
  }
  if (event.key === 'a') {
    keys.a = true;
  }
  if (event.key === 's') {
    keys.s = true;
  }
  if (event.key === 'd') {
    keys.d = true;
  }

  if (keys.w && !jumped) {
    velocityY = -jumpPower;
    jumped = true;
  }

  player.style.left = x + 'px';
  player.style.top = y + 'px';
});

document.addEventListener('keyup', (event) => {
  if (event.key == 'w') {
    keys.w = false;
  }
  if (event.key == 'a') {
    keys.a = false;
  }
  if (event.key == 's') {
    keys.s = false;
  }
  if (event.key == 'd') {
    keys.d = false;
  }
});

function gravity() {
  if (y <= groundY) {
    velocityY += gravityStrength;
  } else {
    velocityY = 0;
    y = groundY;
    jumped = false;
  }
  y += velocityY;
  player.style.top = y + 'px';
}

function movePlayer() {
  if (keys.a && x > wallLeft) {
    x -= 10;
  }
  if (keys.d && x <= wallRight - 50) {
    x += 10;
  }
  player.style.left = x + 'px';
}

function resetGame() {
  x = 0;
  y = 840;
  velocityY = 10;
  jumped = false;
  location.reload(); // Refresh the page to reset the game completely
}

function checkWin() {
  if (x + 50 > doorX && x < doorX + doorWidth && y + 50 > doorY && y < doorY + doorHeight) {
    winCount++;
    sessionStorage.setItem('winCount', winCount); // Save win count to sessionStorage
    updateScore(); // Update the UI with the new win count
    
    if (winCount >= 3) {
      winCount = 2
      // If player wins 3 times, redirect to another page
      window.location.href = "gameOver.html"; // You can change this URL to the desired page
    } else {
      alert("You win!");
      resetGame();
    }
  }
}

// Function to check for collision with spikes
function checkSpikeCollision() {
  let spikes = document.querySelectorAll('.spike');
  spikes.forEach(spike => {
    let spikeX = parseInt(spike.style.left);
    let spikeY = parseInt(spike.style.top);
    
    if (x + 40 > spikeX && x < spikeX + 15 && y + 40 > spikeY && y < spikeY + 15) {
      loseCount++;
      sessionStorage.setItem('loseCount', loseCount); // Save lose count to sessionStorage
      updateScore(); // Update the UI with the new lose count
      
      // Player collided with a spike, reset the game
      window.alert("You died! Try again!");
      resetGame();
    }
  });
}

// Spawn 10 spikes at random positions
function spawnSpikes() {
  let spikeCount = 10 + winCount*5;
  for (let i = 0; i < spikeCount; i++) {
    // Avoid spawning in the player area
    let spikeX;
    do {
      spikeX = Math.floor(Math.random() * (wallRight - 200)) + 100;
    } while (spikeX >= x && spikeX <= x + 50); // Avoid spawning in player area

    let spike = document.createElement('div');
    spike.classList.add('spike');
    spike.style.left = spikeX + 'px';
    spike.style.top = groundY + 30 + 'px'; // Positioning spike just above the ground
    document.body.appendChild(spike);
  }
}

function gameLoop() {
  gravity();
  movePlayer();
  checkWin();
  checkSpikeCollision();
  setTimeout(gameLoop, 10);
}

spawnSpikes(); // Spawn spikes once at the start of the game
gameLoop();

// Initial score display
updateScore();
