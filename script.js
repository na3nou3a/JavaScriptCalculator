const buttons = document.querySelectorAll("button");
const display = document.getElementById("display");
let left = ["0"];
let right = ["0"];
let operator = "";

buttons.forEach(function (btn) {
  return btn.addEventListener("click", myFunction);
});

function myFunction(e) {
  let target = e.target;
  let val = target.value;

  if (target.classList.contains("degit")) {
    handelDegit(val);
  } else if (target.classList.contains("operator")) {
    changeOperator(val, target);
  } else if (target.classList.contains("clear")) {
    clear();
  } else if (target.classList.contains("decimal")) {
    handleDecimal(target);
  } else if (target.classList.contains("sign")) {
    handleSign(target);
  } else if (target.classList.contains("equals")) {
    handleEquals(target);
  } else if (target.classList.contains("percent")) {
    calcPercentage(target);
  }
}

function handelDegit(degit) {
  if (operator === "") {
    if (left.length === 1 && left[0] === "0" && degit === "0") {
      return;
    } else if (left.length === 1 && left[0] === "0" && degit !== "0") {
      left = [degit];
    } else {
      left.push(degit);
    }
    changeDisplay(left);
  } else {
    if (right.length === 1 && right[0] === "0" && degit === "0") {
      return;
    } else if (right.length === 1 && right[0] === "0" && degit !== "0") {
      right = [degit];
    } else {
      right.push(degit);
    }
    changeDisplay(right);
  }
}

function changeDisplay(array) {
  display.textContent = array.join("");
}

function changeOperator(op, btn) {
  const previousHeighlighted = document.querySelector(".heighlight");
  if (previousHeighlighted) {
    operator = op;
    previousHeighlighted.classList.remove("heighlight");
    btn.classList.add("heighlight");
  } else {
    operator = op;
    btn.classList.add("heighlight");
  }
}

function clear() {
  const previousHeighlighted = document.querySelector(".heighlight");
  left = ["0"];
  right = ["0"];
  operator = "";
  changeDisplay(left);
  if (previousHeighlighted) {
    previousHeighlighted.classList.remove("heighlight");
  }
}

function handleEquals(equalsBtn) {
  const previousHeighlighted = document.querySelector(".heighlight");
  let val1 = parseFloat(left.join(""));
  let val2 = parseFloat(right.join(""));

  if (operator === "+") {
    sum(val1, val2);
  } else if (operator === "-") {
    sub(val1, val2);
  } else if (operator === "*") {
    mul(val1, val2);
  } else if (operator === "/") {
    devide(val1, val2);
  } else {
    sum(0, 0); // for "" operator
  }

  if (previousHeighlighted) {
    previousHeighlighted.classList.remove("heighlight");
    equalsBtn.classList.add("heighlight");
  } else {
    equalsBtn.classList.add("heighlight");
  }
}

function sum(a, b) {
  let result = a + b;
  restartWith(result);
}

function sub(a, b) {
  let result = a - b;
  restartWith(result);
}

function mul(a, b) {
  let result = a * b;
  restartWith(result);
}

function devide(a, b) {
  let result = a / b;
  restartWith(result);
}

function restartWith(result) {
  const previousHeighlighted = document.querySelector(".heighlight");
  left = [adaptSize(result)];
  right = ["0"];
  operator = "";
  changeDisplay(left);
  if (previousHeighlighted) {
    previousHeighlighted.classList.remove("heighlight");
  }
}
function adaptSize(result) {
  let str = result.toString();
  if (str.length >= 12) {
    let resized = str.slice(0, 12);
    return resized;
  } else {
    return result.toString();
  }
}

function handleSign(btn) {
  const previousHeighlighted = document.querySelector(".heighlight");
  if (operator === "") {
    if (left.length === 1 && left[0] === "0") {
      return;
    } else {
      let signed = -parseFloat(left.join(""));
      left = [signed.toString()];
      changeDisplay(left);
    }
  } else {
    if (right.length === 1 && right[0] === "0") {
      return;
    } else {
      let signed = -parseFloat(right.join(""));
      right = [signed.toString()];
      changeDisplay(right);
    }
  }

  if (previousHeighlighted) {
    previousHeighlighted.classList.remove("heighlight");
    btn.classList.add("heighlight");
  } else {
    btn.classList.add("heighlight");
  }
}

function handleDecimal(btn) {
  const previousHeighlighted = document.querySelector(".heighlight");
  if (operator === "") {
    for (let elm of left) {
      if (elm.includes(".")) {
        return;
      } else if (left.length === 1 && left[0] === "0") {
        left = ["0", "."];
      } else {
        left.push(".");
      }
    }
    changeDisplay(left);
    if (previousHeighlighted) {
      previousHeighlighted.classList.remove("heighlight");
      btn.classList.add("heighlight");
    } else {
      btn.classList.add("heighlight");
    }
  } else {
    for (let elm of right) {
      if (elm.includes(".")) {
        return;
      } else if (right.length === 1 && right[0] === "0") {
        right = ["0", "."];
      } else {
        right.push(".");
      }
    }
    changeDisplay(right);
    if (previousHeighlighted) {
      previousHeighlighted.classList.remove("heighlight");
      btn.classList.add("heighlight");
    } else {
      btn.classList.add("heighlight");
    }
  }
}
// P% * X = Y
function calcPercentage(btn) {
  const previousHeighlighted = document.querySelector(".heighlight");
  let result = parseFloat(left.join("")) / 100 || 0;
  result = result * parseFloat(right.join("")) || 0;
  left = [adaptSize(result)];
  changeDisplay(left);

  if (previousHeighlighted) {
    previousHeighlighted.classList.remove("heighlight");
    btn.classList.add("heighlight");
  } else {
    btn.classList.add("heighlight");
  }
}
