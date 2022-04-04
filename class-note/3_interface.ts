
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

// 함수에 인터페이스 활용
// 이 함수는 특정 형식을 준수하는 데이터만 받겠다고 정의
// 파라미터에 인터페이스를 정의하고, 함수를 호출할때 인자가 파라미터에서 정의한 인터페이스의 규칙을 잘따르는지
function getUser(user: User){
    console.log(user)
}
const capt={
    name: '캡틴',
    age: 100
}
getUser(capt)

// 함수의 스펙(구조)에 인터페이스를 활용
// 인자와 리턴값의 타입을 정의
// 라이브러리를 직접 만드들가 협업할때 함수의 규칙을 잡아놓고 출발.
interface SumFunction {
    (a:number, b:number): number
}

var sum: SumFunction
sum = function(a:number, b:number):number{
    return a+b
}

// 인덱싱 _ 인덱스로 접근하고 그거의 타입을 넣어줌
interface StringArray{
    [index: number]: string
}
var arr2: StringArray = ['a','b','c']
// arr[0]:10

// 인터페이스 딕셔너리 패턴
// 왼쪽에 오는애가 key 타입을 주고 오른쪽은 정규식
interface StringRegexDictionary{
    [key:string]: RegExp
}

var obj2: StringRegexDictionary={
    cssFile: /\.css$/,
    jsFile: /\.js$/,
}
// 추론 value값 갖다대면 obj2의 키값인 string 표시됨
Object.keys(obj2).forEach(function(value){

})

// 인터페이스 확장

interface Person{
    name:string;
    age:number;
}

interface Developer extends Person{
    // name:string;
    // age:number;
    language:string
}

var captain:Developer  ={
    name:"capt",
    age:16,
    language:"ko",
}

// 타입별칭

const name2: string ="capt"
// 를 타입별칭을 사용해 아래처럼 나타낼 수있음
type MyName = string
const name3: MyName= "capt"
