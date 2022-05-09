// 8-1 이넘 소개
// 이넘은 특정 값들의 집합을 의미하는 자료형
// 숫자형 이넘, 문자형 이넘, 복합 이넘 이 있음
// 드롭다운이나 정해진 목록의 값을 지정할 때 이넘을 쓰기 좋음


// 8-2 숫자형이넘
enum Shoes {
  Nike ,
  Adidas,
}

var myShoes = Shoes.Nike;
console.log(myShoes); //  0이 출력 
// Nike갖다대보면 0으로취급
// 이넘을 쓸때 별도의 값을 할당하거나 초기화하지않으면 전부 숫자형 이넘으로 취급
//목록이 추가될수록 1씩 증가 => 갖다대보면 Nike는 0, Adidas는 1 // 만약 10으로 nike를 초기화하면 adidas는 11


// 8-3 문자형 이넘

// enum Shoes {
//   Nike = "나이키",
//   Adidas ="아디다스",
// }

var myShoes = Shoes.Nike;
console.log(myShoes); //  나이키
// 나이키 갖다대보면 문자형은 값이 변환돼서 이상하게 보이지만 출력하면 문자열인 "나이키" 나옴

// 8-4 이넘 활용사례

// 스트링으로 정의했을때
// function askQuestion(answer: string) {
//   if (answer === 'Yes') {
//     console.log("정답입니다");
//   }
//   if (answer === 'No') {
//     console.log("오답입니다");
//   }
// }

// 이넘으로 정의했을 때
enum Answer {
  Yes = "Y",
  No = "N",
}

function askQuestion(answer: Answer) {
  if (answer === Answer.Yes) {
    console.log("정답입니다");
  }
  if (answer === Answer.No) {
    console.log("오답입니다");
  }
}

askQuestion(Answer.Yes); //이넘을 이용해서 정의했기 때문에  파라미터로 이넘에서 제공하는 값만 넘길 수 있음.(데이터만 집어넣을 수 있음) // askQuestion에서 파라미터의 타입이 answer라는 이넘이었기때문
askQuestion("예스");
askQuestion("Yes");
askQuestion("y");

// 이렇게 했을 때 좀 더 정확한 코드가능하고 , 예외처리 케이스가 줄어듬