
// 6-1 인터페이스 소개 및 변수를 정의하는 인터페이스
// 인터페이스 키워드를 사용하면 반복되는 타입을 인터페이스로 지정해 재사용가능하게 해서 상호간의 규칙으로 사용 가능하게 함.
// 인터페이스 정의_ 상호간의 약속
interface User {
    age:number;
    name:string;
}
// 변수에 활용한 인터페이스
var seho: User ={
    age: 33,
    name: "세호"
}

// 6-2 함수의 인자를 정의하는 인터페이스
// 함수에 인터페이스 활용 _ 가장 많이 활용 api 데이터 모양이 어떻다를 정의하고 활용
// 이 함수는 특정 형식을 준수하는 데이터만 받겠다고 정의
// 파라미터에 인터페이스를 정의하고, 함수를 호출할때 인자가 파라미터에서 정의한 인터페이스의 규칙만 받겠다. _ 아님 에러남
function getUser(user: User){
    console.log(user)
}
const capt={
    name: '캡틴',
    age: 100
}
getUser(capt)

// 6-3 함수 구조를 정의하는 인터페이스
// 함수의 스펙(구조)에 인터페이스를 활용
// 라이브러리를 직접 만들든가 협업할때 함수의 규칙을 잡아놓고 출발할 때 사용

// 인터페이스에 인자와 리턴값의 타입을 정의
interface SumFunction {
    (a:number, b:number): number
}

var sum: SumFunction // 타입명시
// sum이라는 함수는 SumFunction 인터페이스 규칙을 따라야함 만약 리턴값이 없으면 number를 반환하지 않으므로 에러남
sum = function(a:number, b:number):number{
    return a+b
}

//6-4 인덱싱 방식을 정의하는 인터페이스 
// 인덱싱 _ 인덱스로 접근하고 그거의 타입을 넣어줌
interface StringArray{
    [index: number]: string
}
var arr2: StringArray = ['a','b','c']
// arr[0]:10 // 스트링이 아니므로 에러


// 6-5 인터페이스 딕셔너리 패턴 
// 인덱싱과 유사
// 왼쪽에 오는애가 key:타입을 주고 오른쪽은 값의 타입 지정(정규식)

interface StringRegexDictionary{
    [key:string]: RegExp
}

var obj2: StringRegexDictionary={
    cssFile: /\.css$/,
    jsFile: /\.js$/,
}
// obj2의 키들만 모아서 배열 돌린다 칠때
// 추론 value값 갖다대면 obj2의 키값인 string 표시됨
Object.keys(obj2).forEach(function(value){

})

// 6-6 인터페이스 확장(상속)
// 기존 것을 확장해서 쓰는것

interface Person{
    name:string;
    age:number;
}

interface Developer extends Person{
    // name:string;
    // age:number; // extends 키워드를 쓰면 Person인터페이스에서 상속받을 수 있음
    language:string
}

var captain:Developer  ={
    name:"capt",
    age:16,
    language:"ko",
}

