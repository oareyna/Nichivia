const input = document.getElementById("Pene");
const ptag = document.getElementById("ptag"); 
const button = document.getElementById("button");
let points = 0;
let name1 = '';

// Handles the first question
function handleInitialQuestion(event) {
    event.preventDefault();
    const userInput = input.value.toLowerCase();

    if (userInput == "b") {
        ptag.innerHTML = "Correct";
        points += 10;
    } else if (userInput == "a" || userInput == "c" || userInput == "d") {
        ptag.innerHTML = "Wrong, try again";
        points -= 10;
    }
    ptag.innerHTML += "<br>Points: " + points;

    // Disable the input and button after the first submission
    disableForm();

    // Immediately load the next question
    questionTwo();
}

// Disable the input and button after the first submission
function disableForm() {
    input.disabled = true;
    button.disabled = true;
}

// Generic function to create a question and handle form submission
function createQuestion(imageSrc, questionText, correctAnswer, nextFunction) {
    const img1 = document.createElement("img");
    img1.src = imageSrc;
    img1.width = "900"
    img1.height = "480"
    document.body.appendChild(img1);

    const formy = document.createElement("form");

    const next = document.createElement("label");
    next.textContent = questionText;

    const one = document.createElement("input");
    one.type = "text";
    const two = document.createElement("button");
    two.type = "submit";
    two.textContent = "Submit";

    const ptag2 = document.createElement("pre");
    ptag2.textContent = "";
    document.body.appendChild(ptag2);
    document.body.appendChild(formy);
    formy.appendChild(next);
    formy.appendChild(one);
    formy.appendChild(two);

    formy.addEventListener("submit", function(event) {
        event.preventDefault();

        // Disable the input and button after submission
        one.disabled = true;
        two.disabled = true;

        const userInput = one.value.toLowerCase();

        if (userInput == correctAnswer) {
            ptag2.innerHTML = "Correct";
            points += 10;
        } else {
            ptag2.innerHTML = "Wrong, try again";
            points -= 10;
        }
        ptag2.innerHTML += "<br>Points: " + points;

        // Immediately proceed to next question after submitting
        nextFunction(); // Proceed to next question
    });
}

// Start loading the next questions after the initial question
function questionTwo() {
    createQuestion("dog.png", "A, B, C or D?", "b", questionThree);
}

function questionThree() {
    createQuestion("goak.png", "A, B, C or D?", "c", questionFour);
}

function questionFour() {
    createQuestion("eigth.png", "A, B, C or D?", "c", questionFive);
}

function questionFive() {
    createQuestion("tenth.png", "A, B, C or D?", "a", questionSix);
}

function questionSix() {
    createQuestion("fifth.png", "A, B, C or D?", "d", questionSeven);
}

function questionSeven() {
    createQuestion("ninth.png", "A, B, C or D?", "d", questionEight);
}

function questionEight() {
    createQuestion("seventh.png", "A, B, C or D?", "b", questionNine);
}

function questionNine() {
    createQuestion("sixth.png", "A, B, C or D?", "b", end);
}

// Final question and the point check at the end
function end() {
    const blankButton = document.createElement("button");
    blankButton.textContent = "Next";
    document.body.appendChild(blankButton);
    blankButton.addEventListener("click", function() {
        document.body.innerHTML = ''; 

        const img1 = document.createElement("img");
        img1.src = "pompompurin2.png";
        img1.width = "900"
        img1.height = "480" 
        document.body.appendChild(img1);

        const formy = document.createElement("form");

        const next = document.createElement("label");
        next.textContent = "Enter your name:";
        const one = document.createElement("input");
        one.type = "text";
        const two = document.createElement("button");
        two.type = "submit";
        two.textContent = "Submit";

        const ptag2 = document.createElement("pre");
        ptag2.textContent = "";
        document.body.appendChild(ptag2);
        document.body.appendChild(formy);
        formy.appendChild(next);
        formy.appendChild(one);
        formy.appendChild(two);

        formy.addEventListener("submit", function(event) {
            event.preventDefault();
            name1 += one.value;
            const newUserInput = one.value.toLowerCase();

            if (newUserInput == "nicholas") {
                points -= 1000000000000;
                end2();
            } else if (newUserInput == "olivia") {
                points += 1000000000000000000;
                end2();
            } else {
                end2();
            }
        });
    });
}

function end2() {
    const blankButton = document.createElement("button");
    blankButton.textContent = "Next";
    document.body.appendChild(blankButton);
    blankButton.addEventListener("click", function() {
        document.body.innerHTML = '';

        const img1 = document.createElement("img");
        img1.src = "kuromi2.png";
        img1.width = "900"
        img1.height = "480"
        document.body.appendChild(img1);

        const status = document.createElement("h1");
        status.textContent = `
            Status based off points:
            -100 >= x : Hates Michigan
            0 >= x : Foreigner
            20 >= x : Thinks Michigan is Ohio
            50 >= x : Visited Michigan for a day
            70 >= x : Grandma lives in Michigan
            90 >= x : Wannabe Canadian
            100/100 : Is Michigan
            100 < x : Is goated
        `;

        let status1 = "";

        if (points <= -100) {
            status1 = 'Hates Michigan';
        } else if (points <= 0) {
            status1 = "Foreigner";
        } else if (points <= 20) {
            status1 = "Thinks Michigan is Ohio";
        } else if (points <= 50) {
            status1 = "Visited Michigan for a day";
        } else if (points <= 70) {
            status1 = "Grandma lives in Michigan";
        } else if (points <= 90) {
            status1 = "Wannabe Canadian";
        } else if (points <= 100) {
            status1 = "Is Michigan";
        } else {
            status1 = "Is goated";
        }

        const results = document.createElement("h2");
        results.textContent = `Hello ${name1}, you have ${points} points!!! Status: ${status1}`;

        const ptag2 = document.createElement("pre");
        ptag2.textContent = "";
        document.body.appendChild(ptag2);
        ptag2.appendChild(status);
        ptag2.appendChild(results);
    });
}

button.addEventListener("click", handleInitialQuestion);
