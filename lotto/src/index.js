const $ = (el) => document.querySelector(el);

class Lotto {
  // this. 또는 상수?
  LOTTO_ARRAYS = Array.from({ length: 45 }, (v, i) => i + 1);
  SETTIMEOUT_TIME = 1000;
  LOTTO_NUMBERS_LENGTH = 7;
  BONUS_NUMBERS_LENGTH = 4;

  constructor() {
    this.init();
  }

  init() {
    const shuffle = this.fisherYatesShuffle(this.LOTTO_ARRAYS);
    const { basic, bonus } = this.pickLottoNumbers(shuffle);
    this.publishLottoNumbers([...basic, ...bonus]);
  }

  fisherYatesShuffle(originArr) {
    const arr = [...originArr];
    const res = [];
    while (arr.length > 0) {
      const randomIdx = Math.ceil(Math.random() * arr.length) - 1;
      res.push(arr.splice(randomIdx, 1)[0]);
    }
    return res;
  }

  // slice숫자 뒤에서부터 자를 때 순서 주의
  pickLottoNumbers(arr) {
    return {
      basic: arr.slice(
        0,
        this.LOTTO_NUMBERS_LENGTH - this.BONUS_NUMBERS_LENGTH
      ),
      bonus: arr.slice(-this.BONUS_NUMBERS_LENGTH),
    };
  }

  drawBall(lottoNumber, $parent) {
    const $ball = document.createElement("div");
    $ball.className = "ball";
    this.colorize(lottoNumber, $ball);
    $ball.innerText = lottoNumber;
    $parent.appendChild($ball);
  }

  colorize(number, $tag) {
    const { backgroundColor, color = "black" } =
      COLOR_SETS[Math.floor(number / 10)];

    $tag.style.backgroundColor = backgroundColor;
    $tag.style.color = color;
  }

  publishLottoNumbers(lottoNumbers) {
    for (let i = 0; i < this.LOTTO_NUMBERS_LENGTH; i++) {
      const isBonus =
        i >= this.LOTTO_NUMBERS_LENGTH - this.BONUS_NUMBERS_LENGTH;
      const parent = isBonus ? $(".bonus") : $(".balls");

      setTimeout(() => {
        this.drawBall(lottoNumbers[i], parent);
      }, (i + 1) * this.SETTIMEOUT_TIME);
    }
  }
}

new Lotto();

const COLOR_SETS = [
  { backgroundColor: "red", color: "white" },
  { backgroundColor: "orange" },
  { backgroundColor: "yellow" },
  { backgroundColor: "blue", color: "white" },
  { backgroundColor: "green", color: "white" },
];
