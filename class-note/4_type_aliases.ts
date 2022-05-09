// 7-1 타입별칭
// 타입별칭은 특정 타입이나 인터페이스를 참조할 수 있는 타입변수를 의미한다. 
// type 키워드 사용

const name2: string ="capt"
// 를 타입별칭을 사용해 아래처럼 나타낼 수있음
type MyName = string
const name3: MyName= "capt"

// 7-2 타입별칭 코드예제
// 타입을 붙일 수 있는 곳에는 다 사용가능_ 코드가독성이 높아지고 오류방지

// 인터페이스 처럼 복잡한 구조(객체)도 가능
type Person = {
  name: string;
  age: number;
};


// 7-3 인터페이스와 타입별칭의 차이
// 1. 갖다댔을 때 타입별칭은 바로 안의 타입의 모습을 볼 수  있고, interface는 interface라고 뜸

// interface Person{
//     name:string;
//     age:number;
// }


var seho: Person = {
  name: "세호",
  age: 30,
};

type MyString = string;
var str: MyString = "hello";

type Todo = { id: string; title: string; done: boolean };
// 타입별칭을 쓰면 코드 가독성이 좋아짐
function getTodo(todo: Todo) {}

 // 인터페이스와 비교한 타입별칭의 특징
// 1. 새로운 타입을 생성하는게 아니라 정해진 타입에 대해 이름을 부여하는거고 프리뷰상태를 볼 수있음.
// 2. 가장 큰 차이는 type는 확장 불가능 interface는 가능__ 가능한 interface를 사용 추천(타입스크립트 공식문서에도 나와있음_확장이 용이함)
