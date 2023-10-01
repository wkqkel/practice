import { getRandomFourNumbers, getRandomIndex } from "./utils.js";

describe("getRandomIndex", () => {
  it("0을 받으면 0을 리턴한다", () => {
    expect(getRandomIndex(0)).toBe(0);
  });

  it("주어진 length 보다 작은 숫자를 리턴한다", () => {
    expect(getRandomIndex(10)).toBeLessThan(10);
    expect(getRandomIndex(4)).toBeLessThan(4);
    expect(getRandomIndex(8)).toBeLessThan(8);
  });
});

describe("getRandomFourNumbers", () => {
  it("중복되지않은 4자리 숫자를 리턴한다", () => {
    expect(new Set([...getRandomFourNumbers()]).size).toBe(4);
  });
});
