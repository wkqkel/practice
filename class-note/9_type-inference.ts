// 13-1 타입추론 소개
// 타입추론이란
//타입스크립트가 어떻게 타입을 추론하는지

// 타입 추론 기본1
// 변수를 선언하거나 초기화할 때 기본적으로 타입이 추론됨._ vsc상에서 갖다대면 추론됨
// 외에도 변수,속성,인자의 기본값,함수의 반환값 등을 설정할때 일어난다.

var a = "10";
// 파라미터에 =하면 넘기지않았을때 디폴트값 설정 es6문법
function getB(b = 10) {
  var c = "hi";
  return b + c;
}

// 10 + '10' // '1010'

// 13-2 인터페이스와 제네릭을 이용한 타입추론방식
// 타입 추론기본2
// 제네릭으로 <T>헤놓으면 사용할 때 타입을 정의가능
// interface Dropdown<T> {
//   value: T;
//   title: string;
// }

// var shopping: Dropdown<string> = {
//   value: "abc",
//   title: "abc",
// };

// 13-3 복잡한 구조에서의 타입 추론방식
// 타입추론기본3
interface Dropdown<T> {
  value: T;
  title: string;
}
// 우리가 선언할때 제레닉으로 DetailedDropdown으로 K의 타입을 넘기면 그게 익스텐즈된 Dropdown의 k로 들어간다
interface DetailedDropdown<K> extends Dropdown<K> {
  description: string;
  tag: K;
}

var detailedItem: DetailedDropdown<number> = {
  title: "abc",
  description: "ab",
  value: "a",
  tag: "a",
};

// 13-4 Best Common Type 추론방식
// 이때까지 명시적으로 하나의 타입만 줬는데 배열의 각 아이템들의 타입이 다를 때 어떻게 추론하는지
//Best common Type_ 알고리즘,방식
// 유니온타입으로 지정
var arr = [1, 2, number];

// 13-5 Typescript Language Server 소개
// vsc에서 타입스크립트 관련 공식페이지참고 _어떻게 설치하고 어떤 기능이 있다
// 인텔리전스_ 코드 자동완성, 규칙들 보여주기
