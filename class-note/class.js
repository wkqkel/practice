// 9-1 클래스 소개
// 자바스크립트에서 클래스를 왜쓰는지부터. ES^부터 생긴 문법.
// 클래스라는 예약어를 사용하고 이름적고 중괄호 열어준다음 클래스 로직을 적어두면됨

// constructor 초기화메써드로,
// 클래스를 가지고 뉴펄슨이라는 인스턴스를 만들었을때 컨스트럭터 안의 클래스로직이 실행됨.

class Person {
  //클래스로직
  constructor(name, age) {
    console.log("생성되었습니다");
    this.name = name;
    this.age = age;
  }
}
var sangwon = new Person("상원", 28); // 펄슨이라는 클래스로 초기화시킨 인스턴스를 만들어낸 객체를 상원이라는 변수에 담음
console.log(sangwon); // 컨스트럭터가 실행됐기맨운에 생성되었습니다 출력하고 만들어낸 sangwon을 담은 객체까지 콘솔로그찍음

// 9-2 자바스크립트 프로토타입 소개
// 자바스크립트는 프로토타입 기반의 언어다.
//
// 프로토타입
// __proto__

var user = { name: "capt", age: 100 };
// 사용자에대한 정보를 user라는 객체에 담았는데 이 정보에 + role을추가
// var admin = {name: 'capt', age: 100, role: 'admin'} // 중복되는 코드를 프로토타입을 이용해 줄일 수 있음
var admin = {};
// admin의 프로토타입을 user객체로 정의했을때 그 객체가 갖고있는걸 내려받아 사용할 수 있음. (상속)
admin.__proto__ = user;
admin.age; //  admin 하면 admin.age하면 상위에 있는 프로토타입의 속성들을 사용할 수 있음
admin.role = "admin"; // 크롬보면 admin= {role:admin} // _proto_에 user있음

// 9-3 자바스크립트 프로토타입의 활용 사례
// 실제 우리한테 이걸 활용해서 어떤 혜택을 주고있었는지
// Object의 메써드
var obj = { a: 10 };
obj.hasOwnProperty("a"); // 객체를 생성하면 _proto_: Object 가 있기 떄문에 거기에 정의된 메써드나 속성을 사용할 수 있음.
// 배열같은 경우에는 하나 생성하면 push등의 메써드를 사용할 수 있는데, []의 _proto_가 Array여서 가능했던것
// 정리하면 객체를 생성하면 기본적으로 __proto__라는 최상위 객체가 있음 array, object 그래서 그에따른 메써드를 쓸수있음

// 9-4 클래스와 프로토타입의 관계
// 클래스라는 것은 결국 기존의 문법에 단순히 신택틱 슈가라는 좀 더 보기좋은 코드
// 추가 기능이나 기존에 제공하던 성질을 바꾸지 않고 단순히 문법만 바뀜

function Person(name, age) {
  this.name = name;
  this.age = age;
}
var capt = new Person("캡틴", 100);

class Person {
  //클래스로직
  constructor(name, age) {
    // console.log("생성되었습니다");
    this.name = name;
    this.age = age;
  }
}
var seho = new Person("세호", 30);
// 위의 두개는 완전히 같은 동작을 하는 코드임
// 즉 클래스 없이도 쓸수 있었는데, 프로토타입 기반으로 가능.
// 만든 배경을 보면 객체지향의 다른 언어 기반 사람들이 조금더 쉽게 쓰게하려고
