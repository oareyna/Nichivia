// JS Logic Entry Point
function startGame() {
    document.getElementById('cutscene').style.display = 'none';
    document.getElementById('game').style.display = 'block';

    // Reset game variables
    money = 0;
    catnip = 0;
    factories = 1;
    productionRate = 1;
    workers = 0;
    workerProductivity = 0.4;
    marcoHappiness = 100;
    gameRunning = true;

    // Reset costs
    factoryCost = factoryBaseCost;
    workerCost = workerBaseCost;
    productionUpgradeCost = productionUpgradeBaseCost;
    workerUpgradeCost = workerUpgradeBaseCost;

    // Clear any existing offers and tasks
    offers = [];
    tasks = [];
    activeTaskTimers.clear();

    // Start game intervals
    gameIntervals();

    // Immediately create first offer and task
    createInitialOfferAndTask();

    // Update display
    updateDisplay();
}

// Game Variables
let money = 0;
let catnip = 0;
let factories = 1;
let productionRate = 1;
let workers = 0;
let workerProductivity = 0.4;
let marcoHappiness = 100;
let gameRunning = true;

const factoryBaseCost = 50;
const workerBaseCost = 25;
const productionUpgradeBaseCost = 100;
const workerUpgradeBaseCost = 50;

let factoryCost = factoryBaseCost;
let workerCost = workerBaseCost;
let productionUpgradeCost = productionUpgradeBaseCost;
let workerUpgradeCost = workerUpgradeBaseCost;

const costMultiplier = 1.15; // Fixed costMultiplier to 1.15

let offers = [];
let tasks = [];
const activeTaskTimers = new Map(); // Track active task timers

// DOM Elements
const moneyEl = document.getElementById('money');
const catnipEl = document.getElementById('catnip');
const factoriesEl = document.getElementById('factories');
const productionRateEl = document.getElementById('productionRate');
const workersEl = document.getElementById('workers');
const workerRateEl = document.getElementById('workerRate');
const happinessLevelEl = document.getElementById('happiness-level');
const taskContainer = document.getElementById('taskContainer');

function updateDisplay() {
    moneyEl.textContent = money.toFixed(2);
    catnipEl.textContent = catnip.toFixed(2);
    factoriesEl.textContent = factories;
    productionRateEl.textContent = productionRate.toFixed(2);
    workersEl.textContent = workers;
    workerRateEl.textContent = (workers * workerProductivity).toFixed(2);
    happinessLevelEl.style.width = `${marcoHappiness}%`;

    toggleButtonState(document.getElementById('buyFactory'), money >= factoryCost);
    toggleButtonState(document.getElementById('hireWorker'), money >= workerCost);
    toggleButtonState(document.getElementById('upgradeProduction'), money >= productionUpgradeCost);
    toggleButtonState(document.getElementById('upgradeWorker'), money >= workerUpgradeCost);
}

function toggleButtonState(button, condition) {
    button.disabled = !condition;
    button.classList.toggle('disabled', !condition);
}

function generateCatnip() {
    catnip += factories * productionRate;
    catnip += workers * workerProductivity;
    updateDisplay();
}

document.getElementById('click-button').addEventListener('click', () => {
    catnip += 1;
    updateDisplay();
});

document.getElementById('buyFactory').addEventListener('click', () => {
    if (money >= factoryCost) {
        money -= factoryCost;
        factories += 1;
        factoryCost = Math.ceil(factoryCost * costMultiplier); // Changed Math.floor to Math.ceil
        updateDisplay();
    }
});

document.getElementById('hireWorker').addEventListener('click', () => {
    if (money >= workerCost) {
        money -= workerCost;
        workers += 1;
        workerCost = Math.ceil(workerCost * costMultiplier); // Changed Math.floor to Math.ceil
        updateDisplay();
    }
});

document.getElementById('upgradeProduction').addEventListener('click', () => {
    if (money >= productionUpgradeCost) {
        money -= productionUpgradeCost;
        productionRate += 1;
        productionUpgradeCost = Math.ceil(productionUpgradeCost * costMultiplier); // Changed Math.floor to Math.ceil
        updateDisplay();
    }
});

document.getElementById('upgradeWorker').addEventListener('click', () => {
    if (money >= workerUpgradeCost) {
        money -= workerUpgradeCost;
        workerProductivity += 0.5;
        workerUpgradeCost = Math.ceil(workerUpgradeCost * costMultiplier); // Changed Math.floor to Math.ceil
        updateDisplay();
    }
});

function createInitialOfferAndTask() {
    createOffer();
    createTask();
}

function createOffer() {
    const offerAmount = Math.floor(Math.random() * 10) + 10;
    const offerPrice = offerAmount * 5;

    const offer = {
        amount: offerAmount,
        price: offerPrice,
        timeout: setTimeout(() => failOffer(offer), 10000),
    };

    offers.push(offer);
    renderOffers();
}

function renderOffers() {
    const offerContainer = document.getElementById('offerContainer');
    offerContainer.innerHTML = '';
    offers.forEach((offer, index) => {
        const offerDiv = document.createElement('div');
        offerDiv.classList.add('offer');
        offerDiv.innerHTML = 
            `<p>Marco will buy ${offer.amount} Catnip for $${offer.price}</p>
            <button onclick="completeOffer(${index})">Sell Catnip</button>`;
        offerContainer.appendChild(offerDiv);
    });
}

function completeOffer(index) {
    const offer = offers[index];
    if (catnip >= offer.amount) {
        catnip -= offer.amount;
        money += offer.price;
        clearTimeout(offer.timeout);
        offers.splice(index, 1);
        renderOffers();
        updateDisplay();
    } else {
        alert("Not enough catnip!");
    }
}

function failOffer(offer) {
    marcoHappiness = Math.max(0, marcoHappiness - 20);
    offers = offers.filter((o) => o !== offer);
    renderOffers();
    updateDisplay();
    checkGameOver();
}

function createTask() {
    const taskOptions = [
        { description: "Write the reverse of the alphabet in order.", validate: (input) => input.trim().toUpperCase() === "ZYXWVUTSRQPONMLKJIHGFEDCBA" },
        { description: "Calculate: (12 × 8) + (45 ÷ 5).", validate: (input) => input.trim() === "101" },
        { description: "Type the first 10 prime numbers, separated by spaces.", validate: (input) => input.trim() === "2 3 5 7 11 13 17 19 23 29" },
        { description: "What is the factorial of 5? (5!)", validate: (input) => input.trim() === "120" },
        { description: "Solve this riddle: What has keys but can't open locks?", validate: (input) => input.trim().toLowerCase() === "piano" },
        { description: "Write the Fibonacci sequence up to 21, separated by spaces.", validate: (input) => input.trim() === "0 1 1 2 3 5 8 13 21" },
        { description: "What is the sum of all even numbers between 1 and 20?", validate: (input) => input.trim() === "110" },
        { description: "Write the binary representation of the number 13.", validate: (input) => input.trim() === "1101" },
        { description: "Spell the word 'Catnip' backward, three times with spaces.", validate: (input) => input.trim() === "pintaC pintaC pintaC" },
        { description: "Find the square of 25 and subtract the square of 15.", validate: (input) => input.trim() === "400" },
    ];

    const randomTaskIndex = Math.floor(Math.random() * taskOptions.length);
    const selectedTask = taskOptions[randomTaskIndex];

    const taskId = Date.now(); // Unique task ID

    const task = {
        id: taskId,
        description: selectedTask.description,
        validate: selectedTask.validate,
    };

    tasks.push(task);
    activeTaskTimers.set(taskId, setTimeout(() => {
        console.log("Task timed out:", selectedTask.description);
        failTask(task);
    }, 15000));

    renderTasks();
}

function failTask(task) {
    console.log("Failing task:", task.description);
    marcoHappiness = Math.max(0, marcoHappiness - 20);
    tasks = tasks.filter((t) => t.id !== task.id);
    clearTimeout(activeTaskTimers.get(task.id));
    activeTaskTimers.delete(task.id);
    renderTasks();
    updateDisplay();
    checkGameOver();
}

function completeTask(index, input) {
    const task = tasks[index];
    if (task.validate(input)) {
        marcoHappiness = Math.min(marcoHappiness + 5, 100);
        clearTimeout(activeTaskTimers.get(task.id));
        activeTaskTimers.delete(task.id);
        tasks.splice(index, 1);
        renderTasks();
        updateDisplay();
    } else {
        alert("Incorrect answer!");
        failTask(task);
    }
}

function renderTasks() {
    taskContainer.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        taskDiv.innerHTML =  
            `<p>${task.description}</p>
            <input type="text" id="taskInput${index}" autocomplete="off">
            <button onclick="completeTask(${index}, document.getElementById('taskInput${index}').value)">Submit</button>`;
        taskContainer.appendChild(taskDiv);
    });
}

function checkGameOver() {
    if (marcoHappiness <= 0) {
        gameRunning = false;
        clearGameIntervals();
        showGameOverCutscene();
    }
}

function checkVictory() {
    if (factories >= 100) { // Fixed the victory condition to 100 factories
        gameRunning = false;
        clearGameIntervals();
        showVictoryCutscene();
    }
}

function clearGameIntervals() {
    if (window.catnipInterval) clearInterval(window.catnipInterval);
    if (window.offerInterval) clearInterval(window.offerInterval);
    if (window.taskInterval) clearInterval(window.taskInterval);

    // Clear all task timers
    activeTaskTimers.forEach((timeout) => clearTimeout(timeout));
    activeTaskTimers.clear();
}

function gameIntervals() {
    if (!gameRunning) return;

    // Clear any existing intervals
    clearGameIntervals();

    // Generate catnip every second
    window.catnipInterval = setInterval(() => {
        if (gameRunning) {
            generateCatnip();
            checkVictory();
        }
    }, 1000);

    // Generate offers every 13 seconds
    window.offerInterval = setInterval(() => {
        if (gameRunning && offers.length === 0) {
            createOffer();
        }
    }, 13000);

    // Generate tasks every 17 seconds
    window.taskInterval = setInterval(() => {
        if (gameRunning && tasks.length === 0) {
            createTask();
        }
    }, 17000);
}

function showGameOverCutscene() {
    document.getElementById('game').style.display = 'none';
    document.getElementById('game-over').style.display = 'block';
    document.getElementById('game-over-message').textContent = "Marco's happiness ran out. Game Over!";
}

function showVictoryCutscene() {
    document.getElementById('game').style.display = 'none';
    document.getElementById('victory').style.display = 'block';
    document.getElementById('victory-message').textContent = "Congratulations! You built 100 factories and achieved ultimate success!";
}

updateDisplay();
