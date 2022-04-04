//초기세팅 npm i로 package.json에 잡아놓은 ts,바벨관련 내용이 노드모듈로 설치됨
// vsc셋팅에서 format on save 체크해제하기(저장시 eslint만 활성화되고, 포멧팅관련 프리티어,뷰티파이 실행안되게끔)
// js를 ts로 변환시킬때 타입을 any로 주고 변화시켜나가기.
// object[]는 배열안에 object가 있다
// 변수, 함수의인자,반환타입먼저 타입정해줌
// todo의 객체 형상인 프로퍼티들의 타입을 구체적으로 정의해야함
// let todoItems: object[];


// 인터페이스르 통해 반복되는 작업을줄임
// type Todo={id:number; title:string; done:boolean}
interface Todo{
  id:number;
  title:string;
  done:boolean
}
let todoItems: Todo[]

// api
function fetchTodoItems() :Todo[]{
  const todos = [
    { id: 1, title: "안녕", done: false },
    { id: 2, title: "타입", done: false },
    { id: 3, title: "스크립트", done: false },
  ];
  return todos;
}

// crud methods
function fetchTodos():{id:number; title:string; done:boolean;}[] {
  const todos = fetchTodoItems();
  return todos;
}
// void는 반환값이 없음을 명시적으로 지정
function addTodo(todo:Todo):void {
  todoItems.push(todo);
}

function deleteTodo(index:number):void {
  todoItems.splice(index, 1);
}

function completeTodo(index:number, todo:Todo): void {
  todo.done = true;
  todoItems.splice(index, 1, todo);
}

// business logic
function logFirstTodo() {
  return todoItems[0]; 
}

function showCompleted():object[] {
  return todoItems.filter((item) => item.done);
}

// TODO: 아래 함수의 내용을 채워보세요. 아래 함수는 `addTodo()` 함수를 이용하여 2개의 새 할 일을 추가하는 함수입니다.
function addTwoTodoItems():void {
  // addTodo() 함수를 두 번 호출하여 todoItems에 새 할 일이 2개 추가되어야 합니다.
  const item1={id:4,title:"item4",done:false}
  addTodo(item1);
  addTodo({id:5,title:"item5",done:false})
}

// NOTE: 유틸 함수
function log():void {
  console.log(todoItems);
}

todoItems = fetchTodoItems();
addTwoTodoItems();
log();
