const buttons = document.querySelectorAll("button");
const display = document.getElementById("display");

let firstPart = [];
let secondPart = [];
let flag = false;
let indice = false;
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
    handleDecimal();
  } else if (target.classList.contains("sign")) {
    handleSign(val);
  } else if (target.classList.contains("equals")) {
    handleEquals(target);
  } else if (target.classList.contains("percent")) {
    calcPercentage(target);
  }
}

function handelDegit(degit) {
  if (!flag) {
    if (firstPart.length === 0 && degit === "0") {
      return;
    } else {
      firstPart.push(degit);
    }
  } else {
    secondPart = [...firstPart];
    firstPart = [];
    flag = false;
    if (firstPart.length === 0 && degit === "0") {
      return;
    } else {
      firstPart.push(degit);
    }
  }
  changeDisplay(firstPart);
}

function changeDisplay(txt) {
  if (Array.isArray(txt)) {
    display.textContent = txt.join("");
  } else {
    display.textContent = txt;
  }
}

function changeOperator(op, btn) {
  const previousHeighlighted = document.querySelector(".heighlight");
  if (firstPart.length === 0 && secondPart.length === 0) {
    return;
  } else {
    if (operator === "" && previousHeighlighted) {
      operator = op;
      previousHeighlighted.classList.remove("heighlight");
      btn.classList.add("heighlight");
      flag = true;
    } else {
      operator = op;
      btn.classList.add("heighlight");
      flag = true;
    }
  }
}

function clear() {
  const previousHeighlighted = document.querySelector(".heighlight");
  firstPart = [];
  secondPart = [];
  flag = false;
  operator = "";
  changeDisplay("0");

  if (previousHeighlighted) {
    previousHeighlighted.classList.remove("heighlight");
  }
}

// function handleEquals(equalsBtn) {
//   const previousHeighlighted = document.querySelector(".heighlight");
//   if (firstPart === [] || secondPart === []) {
//     return;
//   } else {
//     let val1 = parseFloat(firstPart.join(""));
//     let val2 = parseFloat(secondPart.join(""));
//     if (operator === "+") {
//       sum(val1, val2);
//     } else if (operator === "-") {
//       sub(val1, val2);
//     } else if (operator === "*") {
//       mul(val1, val2);
//     } else if (operator === "/") {
//       devide(val1, val2);
//     }

//     if (previousHeighlighted) {
//       previousHeighlighted.classList.remove("heighlight");
//       equalsBtn.classList.add("heighlight");
//     }

//   }
// }

function handleEquals(equalsBtn) {
  let val1;
  let val2;
  const previousHeighlighted = document.querySelector(".heighlight");

  if (firstPart === [] && secondPart === []) {
    return;
  } else if (firstPart.length > 0 && secondPart.length > 0) {
    val1 = parseFloat(firstPart.join(""));
    val2 = parseFloat(secondPart.join(""));
  } else {
    val1 = parseFloat(firstPart.join(""));
    val2 = val1;
    indice = true;
    console.log(indice);
  }

  if (operator === "+") {
    sum(val1, val2);
  } else if (operator === "-") {
    sub(val1, val2);
  } else if (operator === "*") {
    mul(val1, val2);
  } else if (operator === "/") {
    devide(val1, val2);
  }

  if (previousHeighlighted) {
    previousHeighlighted.classList.remove("heighlight");
    equalsBtn.classList.add("heighlight");
  }
}

function sum(a, b) {
  let result = a + b;
  result = adaptSize(result);
  changeDisplay(result);
  reuse(result);
}

function sub(a, b) {
  let result = b - a;
  result = adaptSize(result);
  changeDisplay(result);
  reuse(result);
}

function mul(a, b) {
  let result = a * b;
  result = adaptSize(result);
  changeDisplay(result);
  reuse(result);
}

function devide(a, b) {
  let result = b / a;
  result = adaptSize(result);
  changeDisplay(result);
  reuse(result);
}

function reuse(result) {
  firstPart = [result];
  secondPart = [];
  flag = true;
  if (!indice) {
    operator = "";
  }
}

function adaptSize(result) {
  let str = result.toString();
  if (str.length >= 12) {
    let resized = str.slice(0, 12);
    return parseFloat(resized);
  } else {
    return result;
  }
}

function handleSign(sign) {
  let l = firstPart.length;
  if (
    l === 0 ||
    (l === 1 && firstPart[0] === "0") ||
    (l === 1 && firstPart[0] === 0)
  ) {
    return;
  } else {
    let signed = -parseFloat(firstPart.join(""));
    firstPart = [signed];
    changeDisplay(firstPart);
  }
}

function handleDecimal() {
  console.log("flag", flag);
  if (firstPart.includes(".")) {
    return;
  } else {
    if (firstPart.length === 0) {
      firstPart = [0, "."];
      changeDisplay(firstPart);
    } else {
      if (!flag) {
        firstPart.push(".");
        changeDisplay(firstPart);
      }
    }
  }
}

function calcPercentage(btn) {
  const previousHeighlighted = document.querySelector(".heighlight");

  // P% * X = Y
  let p = parseFloat(firstPart.join("")) / 100;
  p = p * parseFloat(secondPart.join("")) || 0;
  p = adaptSize(p);
  changeDisplay(p);
  reuse(p);
  if (previousHeighlighted) {
    previousHeighlighted.classList.remove("heighlight");
    btn.classList.add("heighlight");
  }
}
