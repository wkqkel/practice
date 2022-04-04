class Person {
  // 클래스 안에서만 쓸땐 private 아닐땐 기본적으로 public 등 변수의 접근범위까지 지정가능
  private name: string;
  public age: number;
  readonly log: string;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
