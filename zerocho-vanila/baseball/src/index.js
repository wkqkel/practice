import { getRandomFourNumbers } from "./utils.js";

const $ = (element) => document.querySelector(element);

class BaseBall {
  constructor() {
    this.answer = getRandomFourNumbers();
    this.tries = [];
  }

  init() {
    this.bindEventListener();
  }

  bindEventListener() {
    $("form").addEventListener("submit", this.onSubmit.bind(this));
  }

  onSubmit(e) {
    e.preventDefault();

    const text = $("input").value;
    this.checkCorrectSubmit(text)
    this.checkGameOver(text);
    this.log({ text, ...this.getBallAndStrike(text, this.answer) });
    this.tries.push(text);
    $("input").value = "";
  }

  checkGameOver(text) {
    if (this.checkHomeRun(text)) {
      this.reset();
      return alert("HomeRun!!");
    }
    if (this.checkOverMaxTries(MAX_TRIES)) {
      this.reset();
      return alert(ERROR_MESSAGES.failure + ` 정답은 ${this.answer}`);
    }
  }

  checkCorrectSubmit(text) {
    const errorMessage = this.returnErrorMessage(text);
    if (errorMessage) {
      return alert(errorMessage);
    }
  }

  returnErrorMessage(text) {
    if (text.length !== 4) {
      return ERROR_MESSAGES.enterFourLength;
    }
    if (new Set(text).size !== 4) {
      return ERROR_MESSAGES.enterUniqueNumber;
    }
    if (this.tries.includes(text)) {
      return ERROR_MESSAGES.enterNotTriedNumber;
    }

    return "";
  }

  checkHomeRun(text) {
    return text === this.answer;
  }

  checkOverMaxTries(maxTries) {
    return this.tries.length >= maxTries - 1;
  }

  getBallAndStrike(text, answer) {
    let strike = 0;
    let ball = 0;
    for (let i = 0; i < answer; i++) {
      const index = text.indexOf(answer[i]);
      if (index === -1) continue;
      index === i ? strike++ : ball++;
    }
    return { strike, ball };
  }

  log({ text, strike, ball }) {
    const logText = `${text}: ${strike}STRIKE ${ball}BALL`;
    $("#logs").innerHTML += `<span>${logText}</span><br/>`;
  }

  reset() {
    $("input").value = "";
    $("#logs").innerHTML = "";
  }
}

const baseball = new BaseBall();
baseball.init();

const ERROR_MESSAGES = {
  enterFourLength: "4자리 숫자를 입력해주세요",
  enterUniqueNumber: "중복되지 않은 숫자를 입력해주세요",
  enterNotTriedNumber: "시도하지 않은 숫자를 입력해주세요",
  failure: "패배하였습니다",
};

const MAX_TRIES = 10;
