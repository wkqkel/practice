export class CarRacingManager {
  #names = [];

  constructor() {}

  receiveNames(names, endProcess) {
    try {
      this.names = names;
      console.log(`참가자: ${names}`);
    } catch (error) {
      this.gameEnd(endProcess, error.message);
    }
  }

  gameEnd(endProcess, message) {
    if (message) console.log(message);
    console.log(GAME_MESSAGES.GAME_OVER);
    endProcess();
  }

  get names() {
    return this.#names;
  }

  set names(str) {
    const names = str.split(",").map((v) => v.trim());
    if (names.some((name) => name.length > 5)) {
      throw new Error(ERROR_MESSAGES.OVER_MAXIMUM_NAME_LENGTH);
    }

    this.#names = names;
  }
}

export const ERROR_MESSAGES = {
  OVER_MAXIMUM_NAME_LENGTH: "이름은 5자 이하만 가능합니다.",
};

export const GAME_MESSAGES = {
  QUESTION: "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n",
  GAME_OVER: "게임이 종료되었습니다.",
};
