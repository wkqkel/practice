// 제너릭
// 타입을 마치 함수의 파라미터 개념으로 받게 되는 것

//1,
// function logText(text) {
//   console.log(text);
//   return text;
// }
// logText(10)

// function logText<T>(text: T): T {
//   console.log(text);
//   return text;
// }
// //함수를 호출하는 시점에 타입을 넘겨줌.
// // 로그텍스트에 인자를 넘길건데 걔의 타입은 스트링임
// logText<string>("하이");

// 기존타입 정의 방식과 제너릭의 차이점_ 함수 중복선언의 단점

// //2.
// function logText(text) {
//   console.log(text);
//   return text;
// }

// function logNumber(num: number) {
//   console.log(num);
//   return num;
// }
// logText(10);
// const num = logNumber(10);
// 이렇게 했을때 num.하면 숫자타입의 메써드를 사용가능한데
// 이렇게 똑같은 로직인데 단순히 타입때문에 두개를 쓰는건 유지보수측면에서 안좋음

//3. 유니온타입을 이용한 선언방식의 문제점
// function logText(text: string | number) {
//   console.log(text);
//   return text;
// }
// const a = logText("a");
// 문자를 넣었음에도 문자열이 아니라 문자|넘버이기때문에 문자열 메써드를 못씀

// 5, 제너릭의 장점과 타입추론에서의 이점

function logText<T>(text: T): T {
  console.log(text);
  return text;
}
// 함수선언할때 제너릭을 쓸거라고 표기하고
// 함수를 호출하는 시점에서 어떤 타입을 쓰겠다
const str = logText<string>("abc");
str.split("");
const login = logText<boolean>(true);
