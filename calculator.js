const display = document.querySelector('.calcdisplay');
const buttons = document.getElementsByClassName("buts");


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
    if (b === 0) {
        return "BRUH"
    } else {
    return a / b;
    }
}

function operate(a, b, operator) {
    if (operator === add) return add(a, b);
    if (operator === subtract) return subtract(a, b);
    if (operator === multiply) return multiply(a, b);
    if (operator === divide) return divide(a, b);
}

function buttonClicks() {
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function (event) {
             console.log(event.target.value)
             
         });
    }
}




console.log(operate(3, 4, add));
console.log(operate(3, 4, subtract));
console.log(operate(3, 4, multiply));
console.log(operate(16, 4, divide));

window.onload = () => {
    displayThis();
}