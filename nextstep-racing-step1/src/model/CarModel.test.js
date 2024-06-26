import { ERROR_MESSAGES } from "../constants/constants";
import { CarModel } from "./CarModel";

const DEFAULT_NAME = "크롱";

describe("CarModel", () => {
  test("자동차는 이름을 가진다.", () => {
    const car = new CarModel(DEFAULT_NAME);

    expect(car.name).toBe(DEFAULT_NAME);
  });

  test("자동차의 이름은 5자 이하만 가능하다.", () => {
    const makeCarModel = (name) => () => new CarModel(name);

    expect(makeCarModel("크롱크롱크")).not.toThrow();
    expect(makeCarModel("크롱크롱크롱")).toThrow(
      ERROR_MESSAGES.OVER_MAXIMUM_CAR_NAME_LENGTH
    );
  });

  test("자동차의 이름은 공백을 가질 수 없다.", () => {
    const makeCarModel = (name) => () => new CarModel(name);

    expect(makeCarModel("")).toThrow(ERROR_MESSAGES.WHITE_CAR_NAME);
    expect(makeCarModel("   ")).toThrow(ERROR_MESSAGES.WHITE_CAR_NAME);
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
