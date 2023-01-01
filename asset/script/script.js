// calculator
let calculator = {
  prev: null,
  current: null,
  operator: null,
  isInputtingNumber: false,
  calc() {
    this.current = operate(this.operator,
      Number(this.prev), Number(this.current));
  },
  clear() {
    this.prev = null;
    this.current = null;
    this.operator = null;
    this.isInputtingNumber = false;
  }
}

function operate(operator, x, y) {
  switch (operator) {
    case '+':
      return x+y;
    case '-':
      return x-y
    case '*':
      return x*y;
    case '/':
      return x*1.0/y;
    default:
      throw new Error('No such operator available.');
  }
}

function handlingInput(input) {
  switch (input) {
    case'0': case'1': case'2': case'3': case'4':
    case'5':case'6': case'7': case'8': case'9':
    {
      if (calculator.isInputtingNumber) {
        if (calculator.current.length < 10) {
          calculator.current += input;
        }
        return;
      }
      calculator.prev = calculator.current;
      calculator.current = input;
      calculator.isInputtingNumber = true;
      return;
    }
    case'+':case'-':case'*':case'/':case'=':
    {
      calculator.isInputtingNumber = false;
      if (calculator.prev != null && calculator.operator != null
        && calculator.operator != '=') {
        calculator.calc();
      }
      if (calculator.operator == '=') {
        calculator.prev = null;
      }
      calculator.operator = input;
      return;
    }
    case'C':
    {
      calculator.clear();
      return;
    }
  }
}

// UI
const buttons = document.querySelectorAll('.btn');
const txtResult = document.querySelector('#result');
const txtOperator = document.querySelector('#operator');

buttons.forEach(btn => {
  btn.addEventListener('mousedown', onActive);
  btn.addEventListener('mouseup', offActive);
})
document.addEventListener('keydown', fireMouseDown);
document.addEventListener('keyup', fireMouseUp);

updateScreen();

function updateScreen() {
  if (calculator.current != null) {
    txtResult.textContent = calculator.current.toString().slice(0, 10);
  } else {
    txtResult.textContent = '';
  }
  txtOperator.textContent = calculator.operator;
}

function onActive(e) {
  this.classList.add('active');
  handlingInput(this.textContent);
  updateScreen();
}

function offActive(e) {
  this.classList.remove('active');
}

function fireMouseDown(e) {
  /*
    the default behavior of keydown event is that it will fire multiple times
    if the user hold the key. I don't want that so I will include a check
    to see if it is repeated.
   */
  if (e.repeat) return;

  const btnTarget = document.querySelector(`.btn[data-key="${e.key}"`);
  if (btnTarget == null) return; // null when an unexpected button is pressed

  btnTarget.dispatchEvent(new Event('mousedown'));
}

function fireMouseUp(e) {
  const btnTarget = document.querySelector(`.btn[data-key="${e.key}"`);
  if (btnTarget == null) return;
  btnTarget.dispatchEvent(new Event('mouseup'));
}
