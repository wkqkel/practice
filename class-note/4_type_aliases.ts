// interface Person{
//     name:string;
//     age:number;
// }

type Person = {
  name: string;
  age: number;
};

// 인터페이스와 타입별칭의 차이
// 갖다댔을 때 타입별칭은 바로 타입의 모습을 볼 수  있고, interface는 interface라고 뜸

var seho: Person = {
  name: "세호",
  age: 30,
};

type MyString = string;
var str: MyString = "hello";

type Todo = { id: string; title: string; done: boolean };
// 타입별칭을 쓰면 코드 가독성이 좋아짐
function getTodo(todo: Todo) {}

//인터페이스와 비교한 타입별칭의 특징
// 새로운 타입을 생성하는게 아니라 정해진 타입에 대해 이름을 부여하는거고 프리뷰상태를 볼 수있음.
// 가장 큰 차이는 type는 확장 불가능 interface는 가능__ 가능한 interface를 사용 추천
