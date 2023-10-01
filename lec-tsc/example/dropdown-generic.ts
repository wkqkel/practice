// 10-7 제네릭 실전예제살펴보기 -코드에 타입 정의
// 10-9 제네릭 실전 예제 살펴보기 - 제네릭을 이용한 타입정의
// 이메일,프로덕트,trueFalse 같이 밸류마다 선언하는게 아닌 제네릭을 이용


interface DropdownItem<T>{
  value: T;
  selected: boolean;
}// <T>는 타입을 받겠단 거고 그 받은 타입을 value와 연결을 한다고 T적어줌 
// DropdownItem<string>
// DropdownItem<number> // 쓸데마다 어떤 타입을 쓸건지 명시=> 타입을 마치 함수의 파라미터처럼 넘긴다고 보면됨

// interface Email {
//   value: string;
//   selected: boolean;
// }

// 하나의 인터페이스로 여러가지 타입을 커버할 수 있는게 제네릭의 장점=> 타입코드를 줄일수있음
const emails: DropdownItem<string>[] = [
  { value: "naver.com", selected: true },
  { value: "gmail.com", selected: false },
  { value: "hanmail.net", selected: false },
];

// interface ProductNumber {
//   value: number;
//   selected: boolean;
// }

// interface TrueFalse{
//   value:boolean;
//   selected:boolean;
// }

const numberOfProducts:  DropdownItem<number>[] = [
  { value: 1, selected: true },
  { value: 2, selected: false },
  { value: 3, selected: false },
];

function createDropdownItem(item: DropdownItem<number>| DropdownItem<string>) {
  const option = document.createElement("option");
  option.value = item.value.toString();
  option.innerText = item.value.toString();
  option.selected = item.selected;
  return option;
}

// NOTE: 이메일 드롭 다운 아이템 추가
// 아래에서 createDropdownItem에 인자로 넣을 email의 타입을 정의해줄거 제너릭활용
// 단순히 유니온타입을 이용해서 정의하면 위에서 인터페이스 선언해주고 해당 인터페이스 value의 타입하나가 바꼈다고 중복 된 것을 넣어준 여러개의 타입을 선언함 
// 향후 어떤 타입이 오더라도 수용가능한 제너릭으로 변환해서 사용해볼것
emails.forEach(function (email) {
  const item = createDropdownItem(email);
  const selectTag = document.querySelector("#email-dropdown");
  selectTag.appendChild(item);
});


 
numberOfProducts.forEach(function (product)){
  const item= createDropdownItem(product)
}




