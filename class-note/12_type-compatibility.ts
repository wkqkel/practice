// 16-1 타입호환이란
// 타입스크립트코드에서 특정 타입이 다른 타입에 잘 맞는지.

// 인터페이스

interface Developer {
  name: string;
  skill: string;
}

// interface Person {
//   name: string;
// }

class Person {
  name: string;
}

var developer: Developer;
var person: Person;
developer = person; // person에는 name밖에없는데 developer은 더 큰 구조라 할당불가능
// 항상 타입이 같지않아도 되고, 타입이 서로 맞는지 확인할 때 내부적으로 존재하는 타입과 속성에 대한 정의를 비교한다 => 구조적타이핑
//  내부적으로 오른쪽의 타입이 더 많아야 왼쪽과 호환이 된다
person = developer;

// 16-2 타입호환예쩨 - 함수, 제네릭

// 함수
var add = function (a: number) {
  // ...
};
var sum = function (a: number, b: number) {
  // ...
};
add = sum;
sum = add; //호환가능_ 왼쪽구조가 타입범위가 더 넓기 때문

// 제네릭

interface Empty<T> {
  //..
}
var empty1: Empty<string>;
var empty2: Empty<number>;
empty1 = empty2; // 값이없어서 양쪽다 구조적으로 호환가능
empty2 = empty1; // 값이없어서 양쪽다 구조적으로 호환가능

interface NotEmpty<T> {
  data: T;
}
var notempty1: NotEmpty<string>;
var notempty2: NotEmpty<number>;

notempty1 = notempty2;
notempty2 = notempty1; // 둘다안됨
