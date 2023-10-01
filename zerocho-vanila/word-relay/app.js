import { MESSAGES } from "./constants.js";

const $ = (selector) => document.querySelector(selector);

class App {
  constructor() {
    this.list = [];
    this.participantsNumber;
  }

  init() {
    this.participantsNumber = this.checkParticipantsNumber();
    this.emptyWord();
    this.addEventListener();
  }

  emptyWord() {
    $("#word").innerText = "";
  }

  addEventListener() {
    $("#submit").addEventListener("submit", (e) => this.submitAnswer(e));
  }

  checkParticipantsNumber() {
    const participantsNumber = +prompt(MESSAGES.checkParticipantsNumber);
    if (participantsNumber) {
      alert(MESSAGES.start);
      return participantsNumber;
    }
    this.checkParticipantsNumber();
  }

  checkConfirmGame() {
    if (confirm(MESSAGES.checkConfirmGame)) return location.reload();
    this.checkConfirmGame();
  }

  submitAnswer(e) {
    e.preventDefault();

    const inputText = $("#input").value;
    if (!inputText) {
      return alert(MESSAGES.requireWord);
    }
    alert(`${inputText} ${MESSAGES.chorus}`);

    if (!this.validateAnswer(inputText)) {
      alert($("#order").innerText + MESSAGES.defeat);
      return this.checkConfirmGame();
    }

    this.updateOrder();
    this.resetInput();
    this.updateWord(inputText);
    this.addList(inputText);
  }

  validateAnswer(text) {
    return (
      text.length > 1 &&
      (this.list.length === 0 || this.list?.at(-1)?.at(-1) === text[0]) &&
      !this.list.includes(text)
    );
  }

  updateOrder() {
    const order = $("#order").innerText;
    $("#order").innerText =
      order >= this.participantsNumber ? 1 : Number(order) + 1;
  }

  resetInput() {
    $("#input").value = "";
  }

  updateWord(inputText) {
    $("#word").innerText = inputText;
  }

  addList(inputText) {
    this.list.push(inputText);
  }
}

const app = new App();
app.init();
