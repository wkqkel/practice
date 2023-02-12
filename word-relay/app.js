const $ = (selector) => document.querySelector(selector);

class App {
  constructor() {
    this.list = [];
    this.participantsNumber;
  }

  init() {
    this.participantsNumber = this.checkParticpantsNumber();
    this.emptyWord();
    this.addEventListener();
  }

  emptyWord() {
    $("#word").innerText = "";
  }

  addEventListener() {
    $("#submit").addEventListener("submit", (e) => this.submitAnswer(e));
  }

  checkParticpantsNumber() {
    const participantsNumber = +prompt("몇 명에서 참가하시겠습니까");
    if (participantsNumber) {
      alert("쿵쿵따리 쿵쿵따~ 쿵쿵따리 쿵쿵따~");
      return participantsNumber;
    }
    this.checkParticpantsNumber();
  }

  checkCofirmGame() {
    if (confirm("게임을 다시 하시겠습니까")) return location.reload();
    this.checkCofirmGame();
  }

  submitAnswer(e) {
    e.preventDefault();

    const inputText = $("#input").value;
    if (!inputText) {
      return alert("제시어를 입력해주세요");
    }
    alert(`${inputText} 쿵쿵따~`);

    if (!this.validateAnswer(inputText)) {
      alert(`${$("#order").innerText}님이 패배하였습니다`);
      return this.checkCofirmGame();
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
