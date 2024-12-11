let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let mode = ''; // "multi" for multiplayer, "computer" for playing against computer

const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset-btn');
const modeSelection = document.getElementById('mode-selection');
const gameBoardElement = document.getElementById('game-board');

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Vertical
    [0, 4, 8], [2, 4, 6]              // Diagonal
];

// Mode selection
document.getElementById('multi-player-btn').addEventListener('click', () => {
    mode = 'multi';
    startGame();
});

document.getElementById('computer-btn').addEventListener('click', () => {
    mode = 'computer';
    startGame();
});

// Start a new game
const startGame = () => {
    modeSelection.classList.add('hidden');
    gameBoardElement.classList.remove('hidden');
    resetButton.classList.remove('hidden');
    statusText.classList.remove('hidden');
    resetGame();
};

// Update the game board and check if a player has won
const handleCellClick = (e) => {
    const cellIndex = e.target.getAttribute('data-index');

    if (gameBoard[cellIndex] !== '' || !gameActive) return;

    gameBoard[cellIndex] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWinner()) {
        statusText.textContent = `${currentPlayer} wins!`;
        gameActive = false;
    } else if (gameBoard.every(cell => cell !== '')) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `${currentPlayer}'s turn`;

        checkForDangerousMove(); // Check for dangerous move after the player's move

        if (mode === 'computer' && currentPlayer === 'O') {
            setTimeout(() => {
                computerMove();
            }, 500);
        }
    }
};

// Check if the current player has won
const checkWinner = () => {
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] === currentPlayer && gameBoard[b] === currentPlayer && gameBoard[c] === currentPlayer;
    });
};

// Reset the game
const resetGame = () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    cells.forEach(cell => cell.textContent = '');
    statusText.textContent = `${currentPlayer}'s turn`;
};

// Computer's move
const computerMove = () => {
    let availableMoves = gameBoard
        .map((value, index) => value === '' ? index : -1)
        .filter(index => index !== -1);

    if (availableMoves.length === 0) return;

    const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    gameBoard[randomMove] = 'O';
    cells[randomMove].textContent = 'O';

    if (checkWinner()) {
        statusText.textContent = `O wins!`;
        gameActive = false;
    } else if (gameBoard.every(cell => cell !== '')) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = 'X';
        statusText.textContent = `X's turn`;
        checkForDangerousMove();  // Check for dangerous move after computer's move
    }
};

// Check for dangerous moves that could win the game
const checkForDangerousMove = () => {
    const dangerousMove = findDangerousMove(currentPlayer);
    if (dangerousMove !== -1) {
        const cell = cells[dangerousMove];
        // Show the hand icon above the dangerous move
        if (!cell.querySelector('.hand')) {
            cell.innerHTML += `<span class="hand">&#128075;</span>`; // Add hand icon only if it doesn't exist
        }
    }
};

// Find a dangerous move where a piece should be removed (e.g., an opponent's winning move)
const findDangerousMove = (player) => {
    const opponent = player === 'X' ? 'O' : 'X';
    for (let i = 0; i < winPatterns.length; i++) {
        const [a, b, c] = winPatterns[i];
        const cellsInPattern = [a, b, c];
        const opponentCells = cellsInPattern.filter(index => gameBoard[index] === opponent);
        
        if (opponentCells.length === 2) {
            const emptyCell = cellsInPattern.find(index => gameBoard[index] === '');
            if (emptyCell !== undefined) return emptyCell;
        }
    }
    return -1;
};

// Add event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
