import { CarRacingManager } from "../src/controller/CarRacingManager";
import { ERROR_MESSAGES } from "../src/constants/constants";
import { CarModel } from "../src/model/CarModel";
import { GameModel } from "../src/model/GameModel";
import { makeConsecutiveRangeArray } from "../src/utils/utils";

const DEFAULT_NAME = "크롱";
const DEFAULT_NAMES = ["크롱", "뽀로로", "루피", "포비"];

describe("CarModel", () => {
  test("자동차는 이름을 가진다.", () => {
    const car = new CarModel(DEFAULT_NAME);

    expect(car.name).toBe(DEFAULT_NAME);
  });

  test("자동차의 이름은 5자 이하만 가능하다.", () => {
    expect(() => {
      new CarModel("크롱크롱크롱");
    }).toThrow(ERROR_MESSAGES.OVER_MAXIMUM_CAR_NAME_LENGTH);
  });

  test("자동차의 이름은 공백을 가질 수 없다.", () => {
    expect(() => new CarModel("")).toThrow(ERROR_MESSAGES.WHITE_CAR_NAME);
    expect(() => new CarModel("   ")).toThrow(ERROR_MESSAGES.WHITE_CAR_NAME);
  });

  test("주어진 숫자가 4 이상일 경우 전진한다.", () => {
    const car = new CarModel(DEFAULT_NAME);

    car.go(4);

    expect(car.movement).toBe(1);
  });

  test("주어진 숫자가 4 미만일 경우 전진하지않는다.", () => {
    const car = new CarModel(DEFAULT_NAME);

    [0, 1, 2, 3].forEach(car.go);

    expect(car.movement).toBe(0);
  });
});

describe("GameModel", () => {
  test("게임의 참가는 자동차만 가능하다.", () => {
    const game = new GameModel();
    const cars = DEFAULT_NAMES.map((v) => new CarModel(v));

    const setParticipants = (cars) => () => (game.participants = cars);

    expect(setParticipants(cars)).not.toThrow();
    expect(setParticipants(DEFAULT_NAMES)).toThrow();
    expect(setParticipants("")).toThrow();
    expect(setParticipants(3)).toThrow();
  });

  test("게임의 참가는 2대 이상부터 가능하다.", () => {
    const game = new GameModel();
    const cars = DEFAULT_NAMES.map((v) => new CarModel(v));

    const setParticipants = (cars) => () => (game.participants = cars);

    expect(setParticipants([])).toThrow();
    expect(setParticipants(cars.slice(0, 1))).toThrow();
    expect(setParticipants(cars.slice(0, 2))).not.toThrow();
    expect(setParticipants(cars)).not.toThrow();
  });

  test("중복된 이름으로는 게임에 참여가 불가능하다.", () => {
    const game = new GameModel();
    const cars_has_duplicated_names = [...DEFAULT_NAMES, ...DEFAULT_NAMES].map(
      (v) => new CarModel(v)
    );

    const setParticipants = (cars) => () => (game.participants = cars);

    expect(setParticipants(cars_has_duplicated_names)).toThrow();
  });
});

describe("자동자 경주 게임", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("경주 셋팅", () => {
    test("이름은 쉼표(,)를 기준으로 구분하여 받는다.", () => {
      const carRacingManager = new CarRacingManager();

      carRacingManager.setParticipants("뽀로로, 크롱, 루피");

      expect(carRacingManager.getParticipantsName()).toEqual([
        "뽀로로",
        "크롱",
        "루피",
      ]);
    });

    test("사용자가 잘못된 입력 값을 작성한 경우 프로그램을 종료한다.", () => {
      const carRacingManager = new CarRacingManager();
      const processEnd = jest.fn();

      carRacingManager.gameStart("뽀로로, 크롱크롱크롱, 루피", processEnd);

      expect(processEnd).toBeCalled();
    });
  });

  describe("경주 진행", () => {
    test("전진하는 조건은 0에서 9 사이에서 무작위 값을 구한 후 무작위 값이 4 이상일 경우이다.", () => {
      const carRacingManager = new CarRacingManager();

      makeConsecutiveRangeArray(0, 9).forEach((v) => {
        if (v >= 4) {
          expect(carRacingManager.canMove(v)).toBeTruthy();
        } else {
          expect(carRacingManager.canMove(v)).toBeFalsy();
        }
      });
    });

    test("전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.", () => {
      const { carRacingManager, spyOn } = gameSetUp();

      carRacingManager.printCarAndMove("뽀로로", 3);

      expect(spyOn.log).toBeCalledWith("뽀로로: ---");
    });

    test("자동차 경주는 5회로 고정하여 진행한다.", () => {
      const { gameStart, spyOn } = gameSetUp();

      gameStart();

      expect(spyOn.roundStart).toBeCalledTimes(5);
    });
  });

  describe("우승자 출력", () => {
    test("자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다.", () => {
      const { carRacingManager, gameStart, spyOn } = gameSetUp();

      gameStart();

      expect(spyOn.printGameEndMessage).toBeCalledWith(
        `${carRacingManager.winners}가 최종 우승했습니다.`
      );
    });

    test("우승자가 여러 명일 경우 쉼표(,)를 이용하여 구분한다.", () => {
      const { carRacingManager, gameStart, spyOn } = gameSetUp();
      carRacingManager.getIndexesOfMaxValue = jest.fn(() => [0, 2]);

      gameStart();

      expect(spyOn.printGameEndMessage).toBeCalledWith(
        "뽀로로,루피가 최종 우승했습니다."
      );
    });
  });
});

function gameSetUp() {
  const carRacingManager = new CarRacingManager();

  const processEnd = () => {};
  const sleep = () => {};
  const gameStart = () =>
    carRacingManager.gameStart("뽀로로, 크롱, 루피", processEnd, sleep);

  const spyOn = {
    printGameEndMessage: jest.spyOn(carRacingManager, "printGameEndMessage"),
    roundStart: jest.spyOn(carRacingManager, "roundStart"),
    log: jest.spyOn(console, "log"),
  };

  return { carRacingManager, gameStart, spyOn };
}
