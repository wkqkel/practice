// 9.4 타입스크립트의 클래스와 자스의 클래스 차이

// class Person {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
// } // js에서 그대로를 ts에 쓰면 에러남

class Person {
  // 1. 타입스크립트에서는 클래스의 최상단에 클래스에서의 속성(멤버변수)의 타입을 정의해줘야함
  // 2. 파라미터의 타입도 구체적으로 정의
  // 3. 멤버변수에 대한 변수의 유효(접근)범위까지 설정가능 => 클래스 안에서만 쓸땐 private 아닐땐 기본적으로 public, readonly는 접근만하고 수정안됨.
  private name: string;
  public age: number;
  readonly log: string;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

// 리액트 예전 문법 - 클래스 기반코드
class App extends React.Component {}
// 리액트 최신 문법 - 훅기반의 함수형 코드
function App() {
  return <div>Hello World</div>;
}

// 따라서 클래스를 그렇게 많이 볼일은 없으니 기본적인 문법정도만 알고 나중에 실습해보며 이걸 이렇게 쓸수 있겠구나 하면됨
