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

function operate(a, b, operator) {
    if (operator === add) return add(a, b);
    if (operator === subtract) return subtract(a, b);
    if (operator === multiply) return multiply(a, b);
    if (operator === divide) return divide(a, b);
}

console.log(operate(3, 4, add));
console.log(operate(3, 4, subtract));
console.log(operate(3, 4, multiply));
console.log(operate(16, 4, divide));