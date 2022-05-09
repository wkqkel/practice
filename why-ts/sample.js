// 자바스크립트를 타입스크립트처럼 코딩하는 방법 jsDoc과 ts-check로 할 수 있지만

// @ts-check

/**
 *
 * @param {number} a 첫번째 숫자
 * @param {number} b 두번째 숫자
 * @returns
 */

function sum(a, b) {
  return a + b;
}

sum(10, "20");
