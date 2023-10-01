//5-1 첫번째 실습프로젝트 소개 ,환경구성,코드분석

//초기세팅 npm i 입력하면 package.json에 잡아놓은 ts,바벨관련 내용이 노드모듈로 설치될 것. + eslint 설치
// vsc셋팅에서 format on save 체크해제하기(저장시 eslint만 활성화되고, 포멧팅관련 프리티어,뷰티파이 실행안되게끔)

//5-2 파일 설정 더 알아보기
// tsconfig.json은 ts에서 js로 컴파일할때 세부사항 지정
// package.json은 npm기본초기화 설정파일 eslint, prettier 등 셋팅됨

//5-3 실습 방법 안내 및 any,void소개
// js를 ts로 변환시킬때 타입을 any로 주고 변화시켜나가기. 정말 모르겠으면 any라도 붙이기.
// void는 반환값이 없음을 명시적으로 지정



//5-4 실습풀이1- 변수, 함수타입 
// 반환타입(리턴값보고),함수의인자, 변수 먼저 타입정해줌

//5-5 실습풀이2 - filter API & 화살표 함수소개 
//5-6 실슬풀이3- 함수구현
// 함수의 리턴값의 타입을 보고 반환타입 지정 return값 없으면 void
// 참고로 노드는 브라우저 밖의 자바스크립트 실행환경

//5-7 실습풀이4 -오류해결 및 구체적인 타입 정의
// function completeTodo(index: number, todo: object): void {
//   todo.done = true;
//   todoItems.splice(index, 1, todo);
// } 
//completeTodo함수에서 todo.done=true; //에러남 // 파라미터 todo의 타입이 객체인데 done속성이 보장돼있지않아서.
// todo: {id: number; title: string; done:boolean} 으로 바꿔줌
// let todoItems: {id: number; title: string; done:boolean}[]; // object[]는 배열안에 object가 있다 // todoItems는 객체인 todo가 모인 배열

//5-8 실습풀이5 = 중복된 코드 제거 및 인터페이스 소개
// 객체인 투두의 (인덱스)타입이 중복됨
// todo의 객체 형상인 프로퍼티들의 타입을 구체적으로 정의해야함
// type Todo={id:number; title:string; done:boolean} // 방법1 _ 타입별칭
// 방법2_인터페이스 

interface Todo {
  id: number;
  title: string;
  done: boolean;
}
let todoItems: Todo[];

// api // 라고 가정, 서버에서 받아온게 아니라 js레벨에서 지정함(실제였음 axios.get()해서 받아왔을 것)
function fetchTodoItems(): Todo[] {
  const todos = [
    { id: 1, title: "안녕", done: false },
    { id: 2, title: "타입", done: false },
    { id: 3, title: "스크립트", done: false },
  ];
  return todos;
}

// crud methods // api호출해서 변수에 담아서 반환하는 함수
function fetchTodos(): { id: number; title: string; done: boolean }[] {
  const todos = fetchTodoItems();
  return todos;
}

// 할일을 todoItems라는 변수에서 관리하는데, 거기 하나 넣어주는 함수
function addTodo(todo: Todo): void {
  todoItems.push(todo);
}

function deleteTodo(index: number): void {
  todoItems.splice(index, 1);
}

// 특정위치의 할일을 완료처리하는 함수
function completeTodo(index: number, todo: Todo): void {
  todo.done = true;
  todoItems.splice(index, 1, todo);
}

// business logic
// 할일관리목록에서 첫번째 반환
function logFirstTodo() {
  return todoItems[0];
}
// 할일관리목록에서 완료된것 반환
function showCompleted(): object[] {
  return todoItems.filter((item) => item.done);
  // return todoItems.filter(function(item){
  //   if(item.done)
  // }) // filter함수랑 같음
}

// TODO: 아래 함수의 내용을 채워보세요. 아래 함수는 `addTodo()` 함수를 이용하여 2개의 새 할 일을 추가하는 함수입니다.
function addTwoTodoItems(): void {
  // addTodo() 함수를 두 번 호출하여 todoItems에 새 할 일이 2개 추가되어야 합니다.
  const item1 = { id: 4, title: "item4", done: false };
  addTodo(item1);
  addTodo({ id: 5, title: "item5", done: false });
}

// NOTE: 유틸 함수
function log(): void {
  console.log(todoItems);
}

todoItems = fetchTodoItems();
addTwoTodoItems();
log();
