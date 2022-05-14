// 타입단언(type assertion)
// 14-1 타입단언 소개
// a값을 바꿧을때 우리는 문자열이 될 것이다 알지만 맨처음의 타입인 any가 변하지않음
var a;
a = 20;
a = "a";
var b = a as string; // 타입스크립트보다 개발자가 더 잘 알고 있으니 타입을 이렇게 써라란것

// DOM API 조작할 때 많이쓰임

// 14-2
// DOM API
// document. 하는 속성들 // 쉽게말해 웹페이지의 태그정보를 조작할수있는
var div = document.querySelector("div"); // 특정 태그에 접근 하는 가장 많이 사용
div.innerText; // 실제 실무에서는 이렇게 이상적으로 접근안됨.. 쿼리셀렉터의 div가 있단 보장을 안하기때문
if (div) {
  div.innerText;
} // 이게 일반적인패턴

// div가 null일 수 있끼때문에 보장을 해줘야한다 아님 에러.... ?. 또는 if사용 또는 as키워드 사용
var div = document.querySelector("div") as HTMLDivElement; // 이 as를 쓰는 시점에서는 무조건 있을 것이다 단언.
div?.innerText;
