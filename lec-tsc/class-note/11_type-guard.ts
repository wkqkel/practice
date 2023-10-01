// 15-1 타입가드를 위한 예제 소개
interface Developer {
  name: string;
  skill: string;
}

interface Person {
  name: string;
  age: number;
}

// 리턴값에다 두개의 인터페이스를 유니온타입으로 정의
// 돔 api에는 해당html엘리먼트 또는 null
// 실제 반환값이나 파라미터를 유니온타입으로 주는 경우가 정말 많을것
function introduce(): Developer | Person {
  return { name: "tony", age: 33, skill: "iron making" };
}
var tony = introduce();
// 유니온타입은 우리가 아무리 리턴값에 명시적으로 skill을 넘겨줬어도 타입의 공통된 속성만 접근가능..
console.log(tony.name);
console.log(tony.skill);
if ((tony as Developer).skill) {
  var skill = (tony as Developer).skill;
  console.log(skill);
} else if ((tony as Person).age) {
  var age = (tony as Person).age;
  console.log(age);
}
//  타입단언만 사용했을 때 반복되는 부분이고 가독성 안좋음 그때 쓰는게 타입가드

// 15-2 타입가드 소개와 적용 is
//타입가드 정의
// 아래패턴은 실제로 많이 사용되는 패턴으로 꼭 알아두셈
// is가 파라미터가 실제로 해당 타입인지 구분 하는 키워드
function isDeveloper(target: Developer | Person): target is Developer {
  return (target as Developer).skill !== undefined;
}
// 이내부로직을 통과하면 인자로 넘긴값이 디벨로퍼인지 아닌지

if (isDeveloper(tony)) {
  tony.skill;
} else {
  tony.age;
}
