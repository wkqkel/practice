//4-3 함수타입-파라미터,반환값

// 함수의 파라미터에 타입을 정의하는 방식 + 반환값에 타입을 정의_ 반환값은 안하더라도 넘버만 두개 받으면 타입추론.
// function sum(a: number, b: number): number {
//   return a + b;
// }

sum(10, 20);

// 파라미터를 제한

function sum(a: number, b: number): number {
  return a + b;
}

function add(a: number, b: number): number {
  // 반환값을 넘버로 지정했는데 없어도 에러가 남
}

//4-4 함수타입-파라미터를 제한하는 특성

// js와 달리 인자가 제대로 넘어오지않으면 표시해줌
// 특정 함수를 사용함에 좀 더 엄격하게 체크해줌
sum(10, 20, 30, 40);

// 4-5 함수타입-옵셔널파라미터

// 물음표를 넣으면 해당 파라미터를 써도 되고 안써도된다.
function log(a: string, b?: string) {}
log("hello world");
log("hello ts", "abc");
