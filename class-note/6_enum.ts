// 이넘은 특정 값들의 집합을 의미하는 자료형으로 숫자형, 문자형
// 드롭다운이나 정해진 목록의 값을 지정할 때 이넘을 쓰기 좋음
// 이넘을 쓸때 별도의 값을 할당하거나 초기화하지않으면 전부 숫자형 이넘으로 취급

//이넘넘버 숫자가 0이고 1씩 증가
enum Shoes {
  Nike = "나이키",
  Adidas,
  Sth,
}

// 문자형은 값이 변환돼서 보이지만 출력하면 문자열나옴
var myShoes = Shoes.Nike;
console.log(myShoes); //  0이 출력

//이넘 활용사례

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
//이넘을 이용해서 정의했기 때문에 이넘에서 제공하는 데이터만 집어넣을 수 있음.
// askQuestion에서 파라미터의 타입이 answer라는 이넘이었기때문
askQuestion(Answer.Yes);
askQuestion("Yes");
