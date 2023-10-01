// 10-1 제너릭 소개
// 다른 언어에서 재사용성이 높은 컴포넌트를 만들때 자주 활용되는 특징이나 문법.
// 타입을 마치 함수의 파라미터 개념으로 받게 되는 것이 제너릭이다

// 10-2 제너릭의 기본문법

// text라는 입력을 받고 그걸 출력하고 그걸 그대로 리턴하는 함수
// function logText(text) {
//   console.log(text);
//   return text;
// }
// logText(10)
// logText('하이')
// logText(true) // 타입을 정의안해서 전부 넣음

// function logText<T>(text: T): T {
//   console.log(text);
//   return text;
// }
// //제너릭을 이용하면 함수를 호출하는 시점에 타입을 지정하면서 넘겨줄  수 있음!
// // 로그텍스트에 인자를 넘길건데 그 인자의 타입은 string임을 명시
// logText<string>("하이");

// 10-3 기존타입 정의 방식과 제너릭의 차이점_ 함수 중복선언의 단점

// function logText(text) {
//   console.log(text);
//   return text;
// } // 현재 텍스트의 타입은 아무것도 정의안해면 any

// function logText(text:string) {
//   console.log(text);
//   text.split('').reverse().join('') // 스트립타입이기때문가능하고 문자열만 받아야되는 상황이 생김
//   return text;
// }

// function logNumber(num: number) {
//   console.log(num);
//   return num;
// }
// logText(10);
// const num = logNumber(10);
// 이렇게 했을때 num.하면 숫자타입의 메써드를 사용가능한데
// 이렇게 똑같은 로직인데 단순히 타입때문에 두개(logText, logNumber)를 쓰는건 유지보수측면에서 안좋음

// 10-4 기존 문법과 제너릭의 차이점- 유니온타입을 이용한 선언방식의 문제점

// function logText(text: string | number) {
//   console.log(text);
//   return text;
// }
// const a = logText("a");
// a.split('')
// 위에처럼 했을 때 좀더쉽게 유니온타입을 이용해 여러개 타입을 받을 수 있게 되는데
// 문자를 넣었음에도 문자열이 아니라 문자|넘버이기때문에(공통만 가능) 문자열 메써드를 못씀
// 리턴한 값을 넣어줘서 그대로 반환하는 a역시 문자열을 넣었음에도 불구하고 정확하게 타입추론이 안된다며 문자열 메써드 사용불가

// 10-5, 제너릭의 장점과 타입추론에서의 이점
// 앞의 두문제를 제너릭으로 어떻게 해결할 수 있는지.

function logText<T>(text: T): T {
  console.log(text);
  return text;
}
// 함수선언할때 제너릭을 쓸거라고 표기하고
// 함수를 호출하는 시점에서 어떤 타입을 쓰겠다
const str = logText<string>("abc");
str.split(""); // 해당 타입에 따른 메써드도 사용가능하게됨
// 인자와 반환값을 모두  타입스크립트 내부에서 제너릭을 이용해서 선언해줌으로써 타입을 틀어지지않게 잘 구성해나갈 수 있음.
const login = logText<boolean>(true);

// 10-6 제너릭 실전예제살펴보기 - 예제설명
// example폴더의 드롭다운
// 드롭다운은 굉장히 자주쓰이는 ui
// html부터 보면 보통은 저걸 타입스크립트에서 백엔드에서 받아와서 배열을 반복해서 붙여줌
// ts보면

// 10--8 인터페이스에 제네릭을 선언하는 방법

// 인터페이스에 제네릭을 선언하는 방법
// interface Dropdown {
//   value: string;
//   selected: boolean;
// }

// const obj: Dropdown = {
//   value: "abc", // 이렇게만들고 obj를 갖다붙이면 드롭다운이 생성될텐데 숫자로 하고싶으면?
//   selected: false,
// };

// 이 벨류값이 언제든 바뀔수있다하면
// 똑같이 드롭다운을 생성하는데 인터페이스를  제네릭으로 정의
interface Dropdown<T> {
  value: T;
  selected: boolean;
}

// <>안에는 밸류의 값이 스트링으로 됨. number를 넣으면 number // 다르면 에러
const obj: Dropdown<string> = {
  value: 3,
  selected: false,
};

// 10-10 제네릭의 타입제한

// 텍스트의 길이를 집어내는 함수
// 함수에 들어갈 타입을 정희하고 그거를 넣어줄수있음.<T>를 하면 타입을 파라미터로 받는단표시고 받을 위치에 T를 넣어주면됨
// 리턴값까지 T로 // 변환값은 명시안해도 타입추론되지만 명시해주면 더 좋음
// 제네릭에도 타입힌트를 줄수있다.
// function logTextLength<T>(text: T[]): T[] {
//   console.log(text.length); // 그냥 text.length안됨 T옆에 배열이 들어올거라고 [] 해줘야 내부에서 관련메써드 사용가능
//   text.forEach(function (text) {
//     console.log(text);
//   });
//   return text;
// }
// logTextLength<string>(["hi"]);

// 10- 11정의된 타입으로 타입을 제한하기

// 제네릭타입제한 2- 정의된 타입 이용하기
interface LengthType {
  length: number;
}
// 제네릭으로 받은 타입에는 length가 있을 것이다 란것을 extends를 이용해 명시
// 제네릭으로 받은 타입은 항상 랭쓰 타입의 하위 타입일 것이기 때문..
// lengthType에 추가로 제한하는거기때문  length타입에 length가 들어가있어서 가능함
function logTextLength<T extends LengthType>(text: T): T {
  text.length;
  return text;
}
// extends를 이용해 상위의 정의된 타입을 확장해서 사용
logTextLength("a");
logTextLength(10);
logTextLength({ leg: 10 });

// 10-12 keyof로 제네릭의 타입제한하기

// 제네릭 타입제한 3- keyof

interface ShoppingItem {
  name: string;
  price: number;
  stock: number;
}

//쇼핑아이템에서 어떤 특정 옵션만 받는 함수
// 쇼핑아이템의 옵션 중 하나만 받겠다고 제한
function getShoppingItemOption<T extends keyof ShoppingItem>(itemOption: T): T {
  return itemOption;
}
// getShoppingItemOption(10);
// getShoppingItemOption<string>("a"); //호출하는 시점에 타입을 잘 넘겨줌.
// 위에 정의한 아이템의 속성만, 속성들 중 하나만 받겠다 하려면 extends key of 키워드사용
// ctrl+ space누르면 제공받을 수 있는거 보여줌
getShoppingItemOption("name"); // 키값만 받을 수 있음
