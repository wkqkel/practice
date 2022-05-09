// 4-1 기본타입-문자열,숫자,배열
//js 문자열 선언
// var str = "hello";

//ts 문자열 선언
let str: string = "hello";
// ts 숫자
let num: number = 10;
//ts 배열

// 어레이 타입이고 number,문자만 들어감
let arr: Array<number> = [1, 2, 3];
let heros: Array<string> = ["Capt", "Thor", "Hulk"];
// ts배열 선언 _ 더 편한 방법
let items: number[] = [1, 2, 3];

//4-2 기본타입- 튜플,객체, 진위값
// ts튜플 _ 배열의 모든 인덱스의 타입까지 정의
let address: [string, number] = ["gangnam", 3];

// ts객체 정의 방식
let obj: Object = {};

// let person: object = {
//   name: "sangwon",
//   age: 100,
// };

//객체의 인덱스의 타입까지 지정
let person: { name: string; age: number } = {
  name: "das",
  age: 10,
};

//TS 진위값
let show: boolean = true;
