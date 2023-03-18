const $$ = (element) => document.querySelectorAll(element);
const $ = (element) => document.querySelector(element);

// 클래스
// private # 변수에
class Calculator {
  constructor() {
    // FIXME: num1 num2 변수
    // TODO: 다른 숫자를 눌렀을 때 +
    // TODO: 처음에 -눌렀을때
    // TODO: 연산자 교체
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
      (this.OPERATE_EVENT_MAP[el.innerText] || this.onClickDigit).bind(this);
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

  onClickCalculate() {
    if (this.operator && !this.num2) {
      alert(ERROR_MESSAGE.enterNum2);
      return;
    }
    if (!this.operator) {
      return;
    }
    const calculateResult = calculate(this.num1, this.operator, this.num2);

    this.num1 = calculateResult;
    this.num2 = "";
    this.operator = "";
    this.updateScreen.operator("");
    this.updateScreen.result(calculateResult);
  }

  onClickReset() {
    // FIXME: 초기화를 묶어주기?
    this.num1 = "";
    this.operator = "";
    this.num2 = "";
    this.updateScreen.operator("");
    this.updateScreen.result("");
  }

  updateScreen = {
    // 생각해보기: #이 id와 private를 가리키는 걸로 같이 쓰일 수 있음.
    operator: (text) => ($("#operator").value = text),
    result: (text) => ($("#result").value = text),
  };

  OPERATE_EVENT_MAP = {
    "+": this.onClickOperator,
    "-": this.onClickOperator,
    "/": this.onClickOperator,
    x: this.onClickOperator,
    "=": this.onClickCalculate,
    C: this.onClickReset,
  };
}

const calculator = new Calculator();
calculator.init();

const ERROR_MESSAGE = {
  enterNumberFirst: "숫자를 먼저 입력해야합니다.",
  enterNum2: "두번째 숫자를 입력해주세요",
};

const calculate = (num1, operator, num2) => {
  return {
    "+": +num1 + +num2,
    "-": +num1 - +num2,
    "/": +num1 / +num2,
    x: +num1 * +num2,
  }[operator];
};
