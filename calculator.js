let first = ''
let second = ''
let currentOp = null
let resetPrimary = false
let sumPresent = false

const primaryDisplay = document.querySelector('.calcdisplay');
const secondaryDisplay = document.querySelector('.secdisplay');
const numButtons = document.querySelectorAll(".buts");
const opButtons = document.querySelectorAll(".butsop");
const resetButton = document.getElementById('reset');
const deleteButton = document.getElementById('delete');
const equalButton = document.getElementById('equals');
const decimalButton = document.getElementById('decimal');
const prevCalc = document.querySelector('.prevcalc');

resetButton.addEventListener('click', reset)
equalButton.addEventListener('click', evaluate)
deleteButton.addEventListener('click', deleteFn)
window.addEventListener('keydown', handleKeyboardInput)
decimalButton.addEventListener('click', appendDecimal)

numButtons.forEach((button) =>
    button.addEventListener('click', () => append(button.textContent))
)

opButtons.forEach((button) =>
    button.addEventListener('click', () => setOp(button.value))
)

function reset() {
    primaryDisplay.textContent = '0';
    secondaryDisplay.textContent = '';
    first = ''
    second = ''
    currentOp = null
    resetPrimary = false
    sumPresent = false
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

function operate(a, b, operator) {
    sumPresent = true;
    a = Number(a)
    b = Number(b)
    if (operator === '+') return add(a, b);
    if (operator === '-') return subtract(a, b);
    if (operator === '×') return multiply(a, b);
    if (operator === '÷') return divide(a, b);
    
}

function appendDecimal() {
    if (resetPrimary) resetPrimaryDisplay()
    if (primaryDisplay.textContent === '')
      primaryDisplay.textContent = '0'
    if (primaryDisplay.textContent.includes('.')) return
    primaryDisplay.textContent += '.'
  }

function setOp(op) {
    if (currentOp !== null) evaluate();
    currentOp = op;
    first = primaryDisplay.textContent;
    secondaryDisplay.textContent = `${first} ${currentOp}`;
    resetPrimary = true;
}

function append(number) {
    if (sumPresent) resetPrimaryDisplay();
    if (resetPrimary) resetPrimaryDisplay();
    if (primaryDisplay.textContent === '0') resetPrimaryDisplay();
    primaryDisplay.textContent += number;
}
 
function evaluate() {
    if (currentOp === '÷' && primaryDisplay.textContent === '0') divideByZero();
    if (currentOp === null) return;
    if (resetPrimary) return;
    second = primaryDisplay.textContent;
    primaryDisplay.textContent = operate(first, second, currentOp);
    const old = `${first} ${currentOp} ${second} =`
    secondaryDisplay.textContent = old;
    const oldHistory = `${first} ${currentOp} ${second} = ${primaryDisplay.textContent}`
    calcHistory(oldHistory);
    currentOp = null;
}

function resetPrimaryDisplay() {
    primaryDisplay.textContent = '';
    resetPrimary = false;
    sumPresent = false;
}

function divideByZero() {
    primaryDisplay.textContent = 'BRUH'
    resetPrimary = true;
    setTimeout(reset, 2000);
}

function deleteFn() {
    if (sumPresent) return
    if (primaryDisplay.textContent.length > 1) {
const deleted = primaryDisplay.textContent.slice(0, -1);
primaryDisplay.textContent = deleted;
    } else {
        return
    }
}

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) append(e.key)
    if (e.key === '.') appendDecimal()
    if (e.key === '=' || e.key === 'Enter') evaluate()
    if (e.key === 'Backspace') deleteFn()
    if (e.key === 'Escape') reset()
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
      setOp(convertOp(e.key))
  }

function convertOp(key) {
    if (key === '/') return '÷'
    if (key === '*') return '×'
    if (key === '+') return '+'
    if (key === '-') return '-'
}

function calcHistory(prev) {
    const prevCalcBox = document.createElement('div')
    prevCalcBox.classList.add('prevcalcbox')
    prevCalcBox.textContent = prev
    prevCalc.appendChild(prevCalcBox)
    if (prevCalc.getElementsByTagName('div').length > 4) {
        prevCalc.removeChild(prevCalc.firstChild);
    }
    console.log(prevCalc.getElementsByTagName('div').length);
}

