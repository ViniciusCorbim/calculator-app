//-------------------------Change Theme-------------------------\\
const btn_theme = document.querySelector("button.themes");
let theme = 1;
btn_theme.addEventListener("click", function () {
  if (theme == 3) {
    theme = 1;
  } else {
    theme++;
  }

  document.documentElement.classList.toggle("theme1", false);
  document.documentElement.classList.toggle("theme2", false);
  document.documentElement.classList.toggle("theme3", false);

  document.documentElement.classList.add("theme" + theme);
});
//-------------------------End Change Theme-------------------------\\

//-------------------------Buttons Animation-------------------------\\
[...document.querySelectorAll(".buttons_container button")].map((btn) => {
  btn.addEventListener("click", function (e) {
    btn.classList.add("animationMode");

    setTimeout(() => {
      btn.classList.remove("animationMode");
    }, 100);
  });
});
//-------------------------End Buttons Animation-------------------------\\

//-------------------------------Calculator-------------------------------\\
const Calculator = {
  textCurrent: "0",
  textPrevious: "",
  numericValue: 0,

  number1: undefined,
  number2: undefined,

  op1: undefined,
  op2: undefined,

  operations: {
    sum(n1, n2) {
      return n1 + n2;
    },

    subtraction(n1, n2) {
      return n1 - n2;
    },

    multiplication(n1, n2) {
      return n1 * n2;
    },

    division(n1, n2) {
      return n1 / n2;
    },
  },

  updateCurrentText(d) {
    if (this.textCurrent.length < 16) this.textCurrent += d.toString();

    if (this.number1 === undefined) this.printPreviousText();
  },

  updateNumericValue() {
    if (isNaN(Number(this.textCurrent))) this.textCurrent = "0";

    this.numericValue = Number(this.textCurrent);
    if (!this.textCurrent.includes(".")) {
      this.textCurrent = this.numericValue.toString();
    }
  },

  printCurrentText() {
    this.updateNumericValue();
    document.getElementById("current").innerHTML = this.textCurrent;
  },

  printPreviousText() {
    document.getElementById("previous").innerHTML = this.textPrevious;
  },

  float() {
    if (!this.textCurrent.includes(".")) {
      document.getElementById("current").innerHTML += ".";
      this.textCurrent += ".";
    }
  },

  delete() {
    if (
      this.op1 !== undefined ||
      (this.op1 === undefined && this.textCurrent === "0")
    ) {
      if (this.number1 === undefined) this.printPreviousText();
      return;
    }
    this.textCurrent = this.textCurrent.toString().slice(0, -1);
    this.printCurrentText();
  },

  reset() {
    this.textCurrent = "0";
    this.textPrevious = "";
    this.numericValue = 0;
    this.number1 = undefined;
    this.number2 = undefined;
    this.op1 = undefined;
    this.op2 = undefined;

    this.printCurrentText();
    this.printPreviousText();
  },

  setOperation(operation) {
    const signals = {
      sum: "+",
      subtraction: "-",
      multiplication: "X",
      division: "÷",
    };

    let op3 = undefined;

    if (this.number1 === undefined && this.textCurrent !== "") {
      this.number1 = this.numericValue;
      this.op1 = operation;
      this.op2 = undefined;
    } else if (this.number2 === undefined && this.textCurrent !== "") {
      if (this.op2 === undefined) {
        op3 = this.op1;
      } else if (this.textCurrent !== "") {
        this.op1 = undefined;
        op3 = this.op2;
      }

      this.number2 = this.numericValue;
      this.number1 = this.operations[op3](this.number1, this.number2);
      this.number2 = undefined;
      this.op2 = operation;
    }

    this.textPrevious = this.number1.toString() + signals[operation];
    this.printPreviousText();

    this.textCurrent = this.number1.toString();
    this.printCurrentText();

    this.textCurrent = "";

    this.op++;
  },

  calculate() {
    if (this.number1 === undefined) {
      this.number1 = this.numericValue;
      this.textPrevious = this.number1.toString() + "=";
      this.printPreviousText();
      this.textPrevious = "";

      this.textCurrent = "0";
      this.textPrevious = "";
      this.number1 = undefined;
      this.number2 = undefined;
      return;
    }

    this.number2 = this.numericValue;
    this.textPrevious += this.number2.toString();
    this.printPreviousText();

    let op3;

    if (this.op2 === undefined) {
      op3 = this.op1;
    } else {
      op3 = this.op2;
    }

    this.number1 = this.operations[op3](this.number1, this.number2);
    this.textCurrent = this.number1.toString();
    this.printCurrentText();

    this.textCurrent = "0";
    this.textPrevious = "";
    this.number1 = undefined;
    this.number2 = undefined;
    this.op1 = undefined;
    this.op2 = undefined;
  },
};

[...document.querySelectorAll(".buttons_container button.numbers")].map(
  (btn) => {
    btn.addEventListener("click", function (e) {
      Calculator.updateCurrentText(e.target.innerText);
      Calculator.printCurrentText();
    });
  }
);

document.getElementById("float").addEventListener("click", function () {
  Calculator.float();
});

document.getElementById("delete").addEventListener("click", () => {
  Calculator.delete();
});

document.getElementById("reset").addEventListener("click", function (e) {
  Calculator.reset();
});

[...document.querySelectorAll(".buttons_container button.operation")].map(
  (btn) => {
    btn.addEventListener("click", function (e) {
      Calculator.setOperation(e.target.id);
    });
  }
);

document.getElementById("equals").addEventListener("click", function (e) {
  Calculator.calculate();
});
//-------------------------------End Calculator-------------------------------\\
