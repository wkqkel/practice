// eslint-disable-next-line import/no-unresolved
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "process";

import {
  ERROR_MESSAGES,
  GAME_MESSAGES,
  MOVEMENT_PRINT,
} from "../constants/constants.js";

const rl = createInterface({ input: stdin, output: stdout });

export default class View {
  static async askNames() {
    const names = await View.#ask(GAME_MESSAGES.ASK_NAMES);
    return names;
  }

  static async askTotalRound() {
    const totalRound = await View.#ask(GAME_MESSAGES.ASK_TOTAL_ROUND);
    return totalRound;
  }

  static printGameStartMessage() {
    View.#print(GAME_MESSAGES.GAME_START);
  }

  static printResult(gameModel) {
    gameModel.records.forEach(record => View.#printRecord(record));
    View.printWinnerMessage(gameModel.winners.map(car => car.name));
  }

  static printGameEndMessage() {
    View.#print(GAME_MESSAGES.GAME_OVER);
  }

  static #printRecord(record) {
    record.forEach(({ name, movement }) =>
      View.#print(`${name}: ${MOVEMENT_PRINT.repeat(movement)}`),
    );
    View.#print(GAME_MESSAGES.PER_ROUND_END);
  }

  static printErrorMessage(errorMessage) {
    View.#print(ERROR_MESSAGES.PREFIX + errorMessage);
  }

  static printWinnerMessage(winners) {
    View.#print(winners + GAME_MESSAGES.WINNER_ALERT_SUFFIX);
  }

  static end() {
    rl.close();
  }

  static #print(message) {
    console.log(message);
  }

  static async #ask(str) {
    const res = await rl.question(str);
    return res;
  }
}
