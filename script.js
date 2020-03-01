let startCalc = false;
let oppSelected = false;

//DISPLAY AND DIGIT INPUT
const digitButtons = document.querySelectorAll(".digit");
const display = document.querySelector(".display");
let savedValue = [];

digitButtons.forEach((button) => {
    button.addEventListener('click', inputDigit);
})

function inputDigit() {
    //start of the calculation - start defining display value
    let digit = null;
    
    keyboardInput === null ? digit = this.textContent : digit = keyboardInput;

    if (!startCalc) {
        savedValue = [];//resets the saved value to empty array
        savedValue[0] = digit;
        display.textContent = savedValue[0];
        startCalc = true;
    } else if (startCalc && !oppSelected && savedValue.length < 10) {
        //inputting the first operand
        savedValue.push(digit);
        display.textContent = savedValue.join('');
    } else if (startCalc && oppSelected) {
        if (!b.length) {
            if (digit == 0 && operation == divide) {
                alert("Can't divide by zero");
                return;
            }
            b[0] = digit;
            display.textContent = (`${display.textContent}${b[0]}`);
        } else if (b.length && b.length < 10) {
            b.push(digit);
            display.textContent = (`${display.textContent}${b[b.length-1]}`);
        }
    }

    keyboardInput = null;
}

//OPERATION BUTTONS
const funcButtons = document.querySelectorAll(".function");

let a = [];
let b = [];
let operation = null;

funcButtons.forEach((button) => {
    button.addEventListener('click', inputOper)
})

function inputOper() {
    let symbol;

    keyboardInput === null ? symbol = this.textContent : symbol = keyboardInput;

    if (!startCalc && !savedValue.toString().length) {
        alert('Please enter a number');
    } else if (!startCalc && savedValue) {
        startCalc = true;
        a = savedValue;
        oppSelected = true;
        selectOperation(symbol);
    } else if (startCalc && oppSelected === false) {
        a = Number(savedValue.join(''));
        oppSelected = true;
        selectOperation(symbol);
    } else if (oppSelected && !b.length) {
        selectOperation(symbol);
    } else if (oppSelected && b.length) {
        getResult();
        a = savedValue;
        b.splice(0, b.length);
        selectOperation(symbol);
    }
}

const equalsButton = document.querySelector('.equals');

equalsButton.addEventListener('click', equals)

function equals() {
    if (a.length || !b.length || !oppSelected) {
        alert('Please complete the expression');
    } else {
        getResult();
        startOver();
    }
}

function getResult() {
    let result = operate(operation, a, Number(b.join('')));

    if (result.toString().length > 10 && result % 1 === 0) {
        result = result.toExponential(4);
    } else if (result.toString().length > 10 && result % 1 !== 0) {
        let intStr = Math.round(result).toString();
        let num = 9 - intStr.length;
        result = Number(result.toFixed(num));
    }

    savedValue = result;
    display.textContent = savedValue;
}

function selectOperation(operator) {
    display.textContent = (`${a} ${operator} `);

    switch (operator) {
        case '+':
            operation = add;
            break;
        case '-':
            operation = subtract;
            break;
        case '×':
            operation = multiply;
            break;
        case '÷':
            operation = divide;
            break;
    }
}

//reset function
function startOver() {
    startCalc = false;
    oppSelected = false;
    a = [];
    b.splice(0, b.length);
    operation = null;
}

const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', clearDisplay);

function clearDisplay() {
    startOver();
    display.textContent = 0;
    savedValue = [];
}

//BACKSPACE BTN AND FUNCTION
const backspaceButton = document.querySelector('.backspace');
backspaceButton.addEventListener('click', deleteLast);

function deleteLast() {   
    if (b.length) {
        //if a and b are defined
        b.pop();
        display.textContent = display.textContent.replace(/\s[\d.]+/, ` ${b.join('')}`);
    } else if (!b.length && oppSelected) {
    //if a and operation are defined
        operation = null;
        oppSelected = false;

        if (!savedValue.length) {
            savedValue = savedValue.split('');
        }

        display.textContent = `${savedValue.join('')}`;
        a = [];
    } else if (savedValue.length > 1 && !oppSelected) {
    //if there's just one operand
        savedValue.pop();
        display.textContent = `${savedValue.join('')}`;
    } else {
        startOver();
        display.textContent = 0;
    }
}

//DECIMAL BUTTON AND FUNCTION
const decButton = document.querySelector('.decimal');
decButton.addEventListener('click', makeDecimal);

function makeDecimal() {
    if (startCalc && !b.length && !oppSelected) {
        if (savedValue.length && !savedValue.includes('.') && savedValue.length < 9) {
            savedValue.push('.');
            display.textContent = savedValue.join('');
        }
    } else if (b.length && b.length < 9) {
        if (!b.includes('.')) {
            b.push('.');
            display.textContent = (`${display.textContent}${b[b.length-1]}`);
        }    
    }
}

//basic math functions

function operate(func, x, y) {
    return func(x, y);
}

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

// //KEYBOARD SUPPORT

let keyboardInput = null;

addEventListener("keydown", function(e) {
    switch (e.keyCode) {
        case 13:
            e.preventDefault();
            equals();
            break;
        case 67:
            clearDisplay();
            break;
        case 8:
            deleteLast();
            break;
        case 190:
        case 191:
            makeDecimal();
            break;
        case 48:
        case 96:
            keyboardInput = 0;
            inputDigit();
            break;
        case 49:
        case 97:
            keyboardInput = 1;
            inputDigit();
            break;
        case 50:
        case 98:
            keyboardInput = 2;
            inputDigit();
            break;
        case 51:
        case 99:
            keyboardInput = 3;
            inputDigit();
            break;
        case 52:
        case 100:
            keyboardInput = 4;
            inputDigit();
            break;
        case 53:
        case 101:
            keyboardInput = 5;
            inputDigit();
            break;
        case 54:
        case 102:
            keyboardInput = 6;
            inputDigit();
            break;
        case 55:
        case 103:
            keyboardInput = 7;
            inputDigit();
            break;
        case 56:
        case 104:
            keyboardInput = 8;
            inputDigit();
            break;
        case 57:
        case 105:
            keyboardInput = 9;
            inputDigit();
            break;
        case 107:
        case 187:
            keyboardInput = '+';
            inputOper()
            break;
        case 109:
        case 189:
            keyboardInput = '-';
            inputOper()
            break;
        case 106:
            keyboardInput = '×';
            inputOper()
            break;
        case 111:
            keyboardInput = '÷';
            inputOper()
            break;
        case 190:
        case 191:
            makeDecimal();
            break;
    }
  });
