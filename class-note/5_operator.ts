// 연산자를 이용한 타입 정의

// function logMessage(value:any){
//     console.log(value)
// }

// logMessage("hello")
// logMessage(100)
// 유니온타입 타입을 하나이상 쓸수있게해줌
// function logMessage(value: string | number){
//     console.log(value)
// }
// logMessage("hello")
// logMessage(100)

// 유니온타입의 장점
// 한가지이상의 타입을 쓰고싶을때 사용
// 타입을 추론해서, 타입에 따른 메서드를 추천에 띄움
// 타입가드: 특정 타입으로 타입의 범위를 좁혀나가는 과정(필터링)
var seho: string | number | boolean;
function logMessage(value: string | number) {
  if (typeof value === "number") {
    value.toLocaleString();
  }
  if (typeof value === "string") {
    value.toString();
  }
  throw new TypeError("value must be string or number");
}

logMessage("hello");
logMessage(100);

// 유니온 타입 특징

interface Developer {
  name: string;
  skill: string;
}

interface Person {
  name: string;
  age: number;
}
// 유니온 타입으로 선언했음에도 공통속성만 적용가능(보장된 속성만 제공) _ 아니면 타입가드 이용
// function askSomeone(someone: Developer | Person) {
//   someone.name;
// }

// | 또는이 유니온 타입이었다면,
// & 연산자를 이용한 인터섹션 타입
// 유니온과 인터셉션의 차이 _ 인터셉션은 모든 속성에 접근 가능
// var soho: string | number | boolean; 교집합 속성
// var capt: string & number & boolean; 합집합 속성

function askSomeone(someone: Developer & Person) {
  someone.name;
  someone.skill;
  someone.age;
}

askSomeone({ name: "디벨로퍼", skill: "웹개발", age: 28 });
