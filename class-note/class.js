// 클래스 문법 소개

// 클래스라는 예약어를 사용하고 이름적고 중괄호 열어준다음
// 클래스 로직을 적어두면됨
// constructor 초기화메써드로,
// 클래스를 가지고 뉴펄슨이라는 인스턴스를 만들었을때 컨스트럭터안의 클래스로직이 실행됨.
//
class Person {
  //클래스로직
  constructor(name, age) {
    console.log("생성되었습니다");
    this.name = name;
    this.age = age;
  }
}
var sangwon = new Person("상원", 28);
console.log(sangwon);

// 프로토타입
// __proto__

var user = { name: "capt", age: 100 };
var admin = {};
// 어드민의 프로토타입을 user객체로 정의했을때
// 그 객체가 갖고있는걸 내려받아 사용할 수 있음. (상속)
admin.__proto__ = user;
admin.age;

// 객체를 생성하면 기본적으로 __proto__라는 최상위 객체가 있음 array, object 그래서 그에따른 메써드를 쓸수있음

// 클래스와 프로토타입의 관계
// 아래 두개는 완전히 같은 동작을 하는 코드임
function Person(name, age) {
  this.name = name;
  this.age = age;
}

class Person {
  //클래스로직
  constructor(name, age) {
    console.log("생성되었습니다");
    this.name = name;
    this.age = age;
  }
}
// 타입스크립트의 클래스와 자스의 클래스 차이
