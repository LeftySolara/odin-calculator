class Stack {
    constructor() {
        this.data = [];
    }

    push(element) {
        this.data.push(element);
    }

    pop() {
        return this.data.pop();
    }

    peek() {
        return this.data[this.data.length - 1];
    }

    isEmpty() {
        return this.data.length === 0;
    }
}

function isOperator(ch) {
    let operators = "^/*+-";
    return operators.includes(ch);
}

function getPrecedence(ch) {
    let precedence;
    switch (ch) {
        case "^":
            precedence = 1;
            break;
        case "/":
        case "*":
            precedence = 2;
            break;
        case "+":
        case "-":
            precedence = 3;
            break;
        default:
            precedence = -1;
    }
    return precedence;
}

function process(operands, operators) {
    let a = operands.pop();
    let b = operands.pop();
    let op = operators.pop();
    let result;

    switch (op) {
        case "+":
            result = a + b;
            break;
        case "-":
            result = b - a;
            break;
        case "*":
            result = a * b;
            break;
        case "/":
            result = b / a;
            break;
        case "^":
            result = a ** b;
            break;
    }
    operands.push(result);
}

function evaluate(expression) {
    let operands = new Stack();
    let operators = new Stack();
    let ch;

    for (let i = 0; i < expression.length; ++i) {
        ch = expression.charAt(i);

        // Check if character is a number
        if (!isNaN(ch)) {
            // Keep parsing characters for multi-digit numbers
            let num = "";
            while (!isNaN(ch) || ch === ".") {
                num = num + ch;
                ++i;
                if (i < expression.length) {
                    ch = expression.charAt(i);
                }
                else {
                    break;
                }
            }
            --i;
            // Convert string to number before pushing to stack
            operands.push(+num);
        }
        else if (isOperator(ch)) {
            while (!operators.isEmpty() && getPrecedence(ch) <= getPrecedence(operators.peek())) {
                process(operands, operators);
            }
            operators.push(ch);
        }
        else if (ch === "(") {
            operators.push(ch);
        }
        else if (ch === ")") {
            // Closing brace, evaluate all enclosed operations
            while (operators.peek() != "(") {
                process(operands, operators);
            }
            operators.pop();
        }
    }

    while (!operators.isEmpty()) {
        process(operands, operators);
    }
    
    return operands.pop();
}

function inputSymbol(number) {
    let display = document.querySelector("#display");
    let oldString = display.value;
    display.value = oldString + number;
}

function backspace() {
    let display = document.querySelector("#display");
    display.value = display.value.slice(0, display.value.length - 1);
}

function clearDisplay() {
    let display = document.querySelector("#display");
    display.value = "";
}

function calculate() {
    let display = document.querySelector("#display");
    let result = evaluate(display.value);

    if (isNaN(result)) {
        display.value = "ERROR";
    }
    else {
        display.value = result;
    }
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

    let backspaceButton = document.querySelector("#backspace");
    backspaceButton.addEventListener("click", backspace);

    let equalsButton = document.querySelector("#equals");
    equalsButton.addEventListener("click", calculate);

    clearDisplay();
}

initialize();
