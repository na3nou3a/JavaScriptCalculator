/*================ VARIABLES ================*/
const buttons = document.querySelectorAll('button');
const display = document.getElementById('display');
let left = ['0'];
let right = ['0'];
let operator = '';
let displayFlag = false;
/*================ EVENTS ================*/
buttons.forEach(function (btn) {
  return btn.addEventListener('click', myFunction);
});
/*================ FUNCTIONS ================*/
// main function
function myFunction(e) {
  const target = e.target;
  const val = target.value;
  if (target.classList.contains('degit')) {
    handelDegit(val);
  } else if (target.classList.contains('operator')) {
    handleOperator(val, target);
  } else if (target.classList.contains('clear')) {
    clear();
  } else if (target.classList.contains('decimal')) {
    handleDecimal(target);
  } else if (target.classList.contains('sign')) {
    handleSign(target);
  } else if (target.classList.contains('equals')) {
    handleEquals();
  }
}
// degits
function handelDegit(degit) {
  if (operator === '') {
    if (left.length === 1 && left[0] === '0' && degit === '0') {
      return;
    } else if (left.length === 1 && left[0] === '0' && degit !== '0') {
      left = [degit.toString()];
    } else {
      left.push(degit.toString());
    }
  } else {
    if (right.length === 1 && right[0] === '0' && degit === '0') {
      return;
    } else if (right.length === 1 && right[0] === '0' && degit !== '0') {
      right = [degit.toString()];
    } else {
      right.push(degit.toString());
    }
  }
  changeDisplay();
}
// display
function changeDisplay(param) {
  if (displayFlag) {
    display.textContent = param;
    return;
  }
  if (param === 0) {
    display.textContent = '0';
  } else {
    if (right.join('') === '0') {
      display.textContent = left.join('') + operator;
    } else {
      display.textContent = left.join('') + operator + right.join('');
    }
  }
}
// operator
function handleOperator(op, btn) {
  const previousHeighlighted = document.querySelector('.heighlight');
  if (operator === '') {
    operator = op;
  } else {
    handleEquals(null);
    operator = op;
  }

  if (previousHeighlighted) {
    previousHeighlighted.classList.remove('heighlight');
  }
  btn.classList.add('heighlight');
  changeDisplay();
}
// clear
function clear() {
  const previousHeighlighted = document.querySelector('.heighlight');
  left = ['0'];
  right = ['0'];
  operator = '';
  displayFlag = false;
  changeDisplay(0);
  if (previousHeighlighted) {
    previousHeighlighted.classList.remove('heighlight');
  }
}
// equals
function handleEquals() {
  const previousHeighlighted = document.querySelector('.heighlight');
  let val1 = parseFloat(left.join(''));
  let val2 = parseFloat(right.join(''));
  let result;
  if (operator === '+') {
    result = sum(val1, val2);
  } else if (operator === '-') {
    result = sub(val1, val2);
  } else if (operator === '*') {
    result = mul(val1, val2);
  } else if (operator === '/') {
    result = devide(val1, val2);
  } else if (operator === '%') {
    result = calcModulus(val1, val2);
  } else {
    result = sum(0, 0); // for "" operator
  }

  if (previousHeighlighted) {
    previousHeighlighted.classList.remove('heighlight');
  }

  result = Math.round(1000000000000 * result) / 1000000000000;
  displayFlag = true;
  changeDisplay(result);
  restartWith(result);
}
// calc functions
function sum(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

function mul(a, b) {
  return a * b;
}

function devide(a, b) {
  return a / b;
}

function calcModulus(a, b) {
  return a % b;
}
// after getting result
function restartWith(result) {
  const previousHeighlighted = document.querySelector('.heighlight');
  displayFlag = false;
  left = [result.toString()];
  right = ['0'];
  operator = '';
  if (previousHeighlighted) {
    previousHeighlighted.classList.remove('heighlight');
  }
}
// + - signs
function handleSign(btn) {
  const previousHeighlighted = document.querySelector('.heighlight');
  if (operator === '') {
    if (left.length === 1 && left[0] === '0') {
      return;
    } else {
      let signed = -parseFloat(left.join(''));
      left = [signed.toString()];
    }
  } else {
    if (right.length === 1 && right[0] === '0') {
      return;
    } else {
      let signed = -parseFloat(right.join(''));
      right = [signed.toString()];
    }
  }
  changeDisplay();

  if (previousHeighlighted) {
    previousHeighlighted.classList.remove('heighlight');
  }
  btn.classList.add('heighlight');
}
// decimal
function handleDecimal(btn) {
  const previousHeighlighted = document.querySelector('.heighlight');
  if (operator === '') {
    const str = left.join('');
    if (str.indexOf('.') >= 0) return;
    if (left.length === 1 && left[0] === '0') {
      left = ['0', '.'];
    } else {
      left.push('.');
    }
  } else {
    const str = right.join('');
    if (str.indexOf('.') >= 0) return;
    if (right.length === 1 && right[0] === '0') {
      right = ['0', '.'];
    } else {
      right.push('.');
    }
  }

  changeDisplay();
  if (previousHeighlighted) {
    previousHeighlighted.classList.remove('heighlight');
  }
  btn.classList.add('heighlight');
}
