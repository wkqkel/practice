const $$ = (element) => document.querySelectorAll(element);
const $ = (element) => document.querySelector(element);

class Calculator {
  EVENT_BIND_MAP = {
    "+": this.onClickOperator,
    "-": this.onClickOperator,
    "/": this.onClickOperator,
    x: this.onClickOperator,
    "=": this.onClickCalculate,
    C: this.onClickReset,
  };

  constructor() {
    this.num1 = "";
    this.operator = "";
    this.num2 = "";
  }

  init() {
    this.bindEventListener();
  }

  bindEventListener() {
    const buttons = $$("button");
    const bindEvent = (el) =>
      (this.EVENT_BIND_MAP[el.innerText] || this.onClickDigit).bind(this);
    buttons.forEach((el) => el.addEventListener("click", bindEvent(el)));
  }

  onClickDigit(event) {
    if (this.operator) {
      this.num2 += event.target.innerText;
      this.updateScreen.result(this.num2);
      return;
    }
    this.num1 += event.target.innerText;
    this.updateScreen.result(this.num1);
  }

  onClickOperator(event) {
    if (!this.num1) {
      alert(ERROR_MESSAGE.enterNumberFirst);
      return;
    }
    this.operator = event.target.innerText;
    this.updateScreen.operator(this.operator);
  }

  onClickCalculate(event) {
    if (this.operator && !this.num2) {
      alert(ERROR_MESSAGE.enterNum2);
      return;
    }
    if (!this.operator) {
      return;
    }
    const calculateResult = {
      "+": +this.num1 + +this.num2,
      "-": +this.num1 - +this.num2,
      "/": +this.num1 / +this.num2,
      x: +this.num1 * +this.num2,
    }[this.operator];

    this.num1 = calculateResult;
    this.num2 = "";
    this.operator = "";
    this.updateScreen.operator("");
    this.updateScreen.result(calculateResult);
  }

  onClickReset() {
    this.num1 = "";
    this.operator = "";
    this.num2 = "";
    this.updateScreen.operator("");
    this.updateScreen.result("");
  }

  updateScreen = {
    operator: (text) => ($("#operator").value = text),
    result: (text) => ($("#result").value = text),
  };
}

const calculator = new Calculator();
calculator.init();

const ERROR_MESSAGE = {
  enterNumberFirst: "숫자를 먼저 입력해야합니다.",
  enterNum2: "두번째 숫자를 입력해주세요",
};
