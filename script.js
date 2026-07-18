// ======================================
// Calculator State
// ======================================

let currentInput = "0";
let previousInput = "";
let operator = "";
let waitingForOperand = false;
let history = "";

// ======================================
// DOM Elements
// ======================================

const display = document.getElementById("display");
const historyDisplay = document.getElementById("history");
const buttons = document.querySelectorAll("button");

// ======================================
// Update Display
// ======================================

function updateDisplay() {

    display.value = currentInput;
    historyDisplay.textContent = history;

}

// ======================================
// Handle Number
// ======================================

function handleNumber(number) {

    if (currentInput === "Error") {

        currentInput = number;
        waitingForOperand = false;
        updateDisplay();
        return;

    }

    if (waitingForOperand) {

        currentInput = number;
        waitingForOperand = false;

    } else {

        if (currentInput === "0") {

            currentInput = number;

        } else {

            currentInput += number;

        }

    }

    updateDisplay();

}


// ======================================
// Handle Decimal
// ======================================

function handleDecimal() {

    if (waitingForOperand) {

        currentInput = "0.";
        waitingForOperand = false;

    } else if (!currentInput.includes(".")) {

        currentInput += ".";

    }

    updateDisplay();

}


// ======================================
// Handle Clear
// ======================================

function handleClear() {

    currentInput = "0";
    previousInput = "";
    operator = "";
    waitingForOperand = false;
    history = "";

    updateDisplay();

}


// ======================================
// Handle Delete
// ======================================

function handleDelete() {

    if (currentInput === "Error") {

        handleClear();
        return;

    }

    if (currentInput.length > 1) {

        currentInput = currentInput.slice(0, -1);

    } else {

        currentInput = "0";

    }

    updateDisplay();

}


// ======================================
// Calculate
// ======================================

function calculate(first, second, operator) {

    first = Number(first);
    second = Number(second);

    switch (operator) {

        case "+":
            return first + second;

        case "-":
            return first - second;

        case "*":
            return first * second;

        case "/":

            if (second === 0) {
                return "Error";
            }

            return first / second;

        case "%":
            return first % second;

        default:
            return "Error";

    }

}

// ======================================
// Handle Operator
// ======================================

function handleOperator(nextOperator) {

    if (operator && waitingForOperand) {

        operator = nextOperator;
        history = `${previousInput} ${operator}`;
        updateDisplay();
        return;

    }

    previousInput = currentInput;
    operator = nextOperator;

    history = `${previousInput} ${operator}`;

    waitingForOperand = true;

    updateDisplay();

}


// ======================================
// Handle Equals
// ======================================

function handleEquals() {

    if (!operator || waitingForOperand) {

        return;

    }

    history = `${previousInput} ${operator} ${currentInput} =`;

    const result = calculate(
        previousInput,
        currentInput,
        operator
    );

    currentInput = String(result);

    previousInput = "";
    operator = "";

    waitingForOperand = false;

    updateDisplay();

}


// ======================================
// Event Listeners
// ======================================

buttons.forEach(function (button) {

    button.addEventListener("click", function () {

        const value = button.dataset.value;

        if (!isNaN(value)) {

            handleNumber(value);

        } else if (value === ".") {

            handleDecimal();

        } else if (value === "AC") {

            handleClear();

        } else if (value === "DEL") {

            handleDelete();

        } else if (value === "=") {

            handleEquals();

        } else {

            handleOperator(value);

        }

    });

});