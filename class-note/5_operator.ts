// 7-1 연산자를 이용한 타입 정의 - Union Type

// 간단하게 로그를 찍는 함수
// function logMessage(value:string){
//     console.log(value)
// }
// logMessage("hello")
// logMessage(100) // 에러

// function logMessage(value:any){
//     console.log(value)
// }
// logMessage("hello")
// logMessage(100) // 에러는 안나지만 사실상 타입의 장점이 사라짐 

// 유니온타입 | 키워드를 사용하면 타입을 하나이상 쓸수있게해줌
// function logMessage(value: string | number){
//     console.log(value)
// }
// logMessage("hello")
// logMessage(100)

// 7-2 유니온타입의 장점
// 특정 파라미터나 변수에 한가지이상의 타입을 쓰고싶을때 사용 , 넣은만큼 추가됨



// 타입가드: 특정 타입으로 타입의 범위를 좁혀나가는 과정(필터링)
var seho: string | number | boolean;
function logMessage(value: string | number) {
  // 1. 타입을 추론해서, 타입에 따른 메서드를 추천에 띄움
  if (typeof value === "number") {
    value.toLocaleString();
  }
  if (typeof value === "string") {
    value.toString();
  }
  // 아닌 경우 에러 발생 // throw 키워드를 사용하면 실행이 종료되고 콜스택의 첫번째 catch블록으로 전달됨
  throw new TypeError("value must be string or number");
}

logMessage("hello");
logMessage(100);

// 7-3 유니온 타입 특징

// 인터페이스를 두개 선언하고 
interface Developer {
  name: string;
  skill: string;
}

interface Person {
  name: string;
  age: number;
}
// 유니온 타입으로 선언했음에도 공통속성만 적용가능(보장된 속성만 제공) // 아니면 타입가드 이용 if(typeof value === "number"){}
// 두개가 가진모든속성 X 공통된 속성만 가능
// function askSomeone(someone: Developer | Person) {
//   someone.name;
//   someone.age; //에러
// }

// 7-4 인터섹션 타입 소개
// | 또는 => 유니온 타입이었다면,
// & 연산자를 이용한 인터섹션 타입

// 7-5 유니온타입과 인터섹션 타입의 차이점
// 유니온과 인터셉션의 차이 _ 인터셉션은 모든 속성에 접근 가능
// var soho: string | number | boolean; // 교집합 속성
// var capt: string & number & boolean; // 합집합 속성 
// capt 갖다대면 never라는 타입 뜸 // 실무에서는 유니온 타입을 더 많이 사용함


function askSomeone(someone: Developer & Person) {
  someone.name
  someone.skill
  someone.age
}

askSomeone({ name: "디벨로퍼", skill: "웹개발", age: 28 });
askSomeone({ name: "디벨로퍼", skill: "웹개발" }); // 합집합으로 두 속성 다 있지 않으면 에러남
