function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    return add(a, b);
}

function inputSymbol(number) {
    let display = document.querySelector("#display");
    let oldString = display.value;
    display.value = oldString + number;
}

function clearDisplay() {
    let display = document.querySelector("#display");
    display.value = "";
}

function initialize() {
    let numberButtons = document.querySelectorAll(".symbolBtn");
    for (let i = 0; i < numberButtons.length; ++i) {
        let number = numberButtons[i].textContent;
        numberButtons[i].addEventListener("click", function (e) {
            inputSymbol(number);
        });
    }

    let clearButton = document.querySelector("#clearBtn");
    clearButton.addEventListener("click", clearDisplay);

    clearDisplay();
}

initialize();
