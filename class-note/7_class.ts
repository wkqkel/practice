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
