TODO 기본구조 및 네이밍 참고 -리액트 공식문서 beta 3번문제
https://beta.reactjs.org/learn/updating-arrays-in-state

참고
https://woojong92.tistory.com/entry/JS-%EB%B0%94%EB%8B%90%EB%9D%BC-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A1%9C-ToDo-List-%EB%A7%8C%EB%93%A4%EA%B8%B0-1-%EA%B8%B0%EB%8A%A5%EC%A0%95%EC%9D%98-%EB%B0%8F-HTMLCSS

deleteTodo 관련
https://svelte.dev/tutorial/keyed-each-blocks

svelte todo 예시
https://svelte.dev/tutorial/each-block-bindings

addButton 클릭 시 빈값일시 포커스 해주기
https://svelte.dev/tutorial/component-this

스벨트 투두 슬쩍 커닝
https://wormwlrm.github.io/2020/06/24/How-to-make-todo-list-app-with-Svelte-2.html

채팅예제 굳굳
https://svelte.dev/tutorial/update

컴포넌트이벤트 바인딩
https://svelte.dev/tutorial/component-events

기본 스벨트 문법
https://kyounghwan01.github.io/blog/Svelte/svelte-basic/#lefecycle
https://wormwlrm.github.io/2020/06/24/How-to-make-todo-list-app-with-Svelte-2.html

궁금한거

스벨트 파일 내에서 컴포넌트 나누는 방법 todoList로 파일만들고 그안에서 item을 또 나누고싶음.
이벤트드릴링 불편 // 근데 이건 리액트도 똑같네 그냥 함수드릴링. 근데 e.detail

문제겪은거
title바꿨는데, 렌더링안됨 todos에 바꼈는데 안됨
위에서 구조분해할당해서 넘겨주면 바껴도 인식안됨 export 넣으나 안넣으나 안됨
// TodoItem.svelte
export let todo;

https://svelte.dev/tutorial/reactive-declarations
https://daveceddia.com/svelte-reactive-destructuring/

  export let todo;
  $: ({ id, done, title } = todo);
  $: inputValue = title;


근데 이렇게하니 done이 또안됨 title.done에 할당이 안돼고 done에 하기때문인듯

왜 함수 props가 아니고, dispatch로 내려줄까 하니 dispatch시에는 위에서 export let 선언을 안해도됨.
이벤트에 의해 발생하는 명시적 표현? 근데 이건 사실 함수이름에서 해주는게 맞음.

읽어보기
https://ui.toast.com/weekly-pick/ko_20191002

### form으로 리팩토링

기존코드
onClickAddBtn라는 함수를 handleKeydown 여기서 사용하는게 별로였음. 버튼을 클릭하는것도 아닌데 네이밍 구림.

<script>
  const onClickAddBtn = () => {
    if (!todoInputText.trim()) return focus();
    dispatch("add", todoInputText);
    todoInputText = "";
  };

  function handleKeydown(event) {
    if (event.key === "Enter") {
      onClickAddBtn();
    }
  }
</script>

  <input  on:keydown={handleKeydown}  bind:value={todoInputText} bind:this={input} placeholder="Add todo" />
  <button on:click={onClickAddBtn}>Add</button>

변경코드

<script>
function focus() {
  input.focus();
}

const onSubmit = () => {
  if (!todoInputText.trim()) return focus();
  dispatch("add", todoInputText);
  todoInputText = "";
};
</script>

<form on:submit|preventDefault={onSubmit}>
  <input bind:value={todoInputText} bind:this={input} placeholder="Add todo" />
  <button>Add</button>
</form>

1. 기본적으로 버튼태그의 타입은 submit이고, 이에 버튼 클릭시 폼의 submit가 발동됨.(type='button' 주면 발동 X)
2. form 태그 내부에 있는 input text box에서 엔터키를 누르게 되면 자동으로 Submit 됨을 이용. 대신 새로고침은 막기 위해 preventDefault처린 해줌
   => handleKeydown함수 삭제하고 인풋과 버튼 두곳으로 인해 발생되어야할 이벤트를 form에서 submit 하나로 처리할 수 있게됨.

## 2번째 과제

### 체크박스 bind문제

todoItem체크박스시 todoList의 bind로 안바뀜
component에도 bind해줘야함
근데 이러면 투두리스트 렌더링 두번되는듯 해서 on:change로 빼줌.
그러면 기존 input의 bind로 관리하는 것도 bind없이 관리해야함.
컴포넌트 바인딩을 많이 사용하는 것은 피하는 것이 좋습니다. 컴포넌트 바인딩은 양방향 데이터 통신을 하기 때문에, 값이 수정되었을 때 어디에서 수정된 것인지 찾기 어려울 수 있습니다.
그리고 처음에는 on:done={handleDoneTodo}해서 따로 만들어줬는데, 결국 todo리스트 입장에서는 아이템의 done부분을 eidt해주는 것이므로
기존에 있던 edit에 newItem을 받는 형식으로 중복을 피할 수 있음.

### new Id

     const id = todos[todos.length - 1]?.id + 1 || 0;
     처음에 ?? 널리쉬 병합연산자 썼는데, 이는 undefined나 null일 경우에만 뒤를 반환
     undefined+1은 NaN을 반환하고 Boolean(NaN)은 false
     결국 false일때 뒤에값을 반환하는 || 을 이용

## 3번째과제 : 필터링
<!-- <div>
  <button on:click={onClickFilterBtn} name="all">All</button>
  <button on:click={onClickFilterBtn} name="active">Active</button>
  <button on:click={onClickFilterBtn} name="completed">Completed</button>
</div> -->
처음에 버튼으로 구현했다가 js없이 css만으로 tab전환시키려고 input radio방식으로 바꿈.
https://velog.io/@henotony/CSS만으로-Tab전환시키는-방법

css는 해당 파일내에서만 유효, 컴포넌트끼리 영향을끼치고 싶으면, 전역스타일시트사용

<label for="all">
  <StyledButton>all</StyledButton>
</label>

<style>
  input[name="tabs"]:not(:checked) + label > button { // 린트잡힘
    color: red;
  }
</style>

label, input중 뭘 onClick달아도 상관없는줄알았는데,
label은 non-interactive-element라고 린트에러

### 문제됐던것
특정탭에서 클릭했을 때 바로 사라지게
특정탭에서 리스트 다 사라졌을때 모든리스트뜨는 현상 없애기
이유: 아래


<script>
  import AddTodo from "./lib/AddTodo.svelte";
  import Filters from "./lib/Filters.svelte";
  import TodoItem from "./lib/TodoItem.svelte";

  const INITIAL_TODO_LIST = [
    { id: 0, title: "스벨트 공부", done: false },
    { id: 1, title: "리액트 공부", done: false },
    { id: 2, title: "자바스크립트 공부", done: false },
  ];

  let todos = [...INITIAL_TODO_LIST];
  $: filteredTodos = todos;
  $: remaining = filteredTodos.filter((todo) => !todo.done).length;

  function handelAddTodo(e) {
    const todoInputText = e.detail;
    const id = todos[todos.length - 1]?.id + 1 || 0;
    todos = [...todos, { id, title: todoInputText, done: false }];
  }

  function handleEditTodo(e) {
    const newTodo = e.detail;
    todos = todos.map((todo) => (todo.id === newTodo.id ? newTodo : todo));
  }

  function handleDeleteTodo(e) {
    const id = e.detail;
    todos = todos.filter((todo) => todo.id !== id);
  }

  function handleClearCompleteTodo() {
    todos = todos.filter((todo) => !todo.done);
  }

  function handleAllCompleteTodo() {
    todos = todos.map((todo) => ({ ...todo, done: true }));
  }

  function handleFilterTodo(e) {
    const type = e.detail;
    switch (type) {
      case "all":
        return (filteredTodos = todos);
      case "active":
        return (filteredTodos = todos.filter((item) => !item.done));
      case "completed":
        return (filteredTodos = todos.filter((item) => item.done));
      default:
        filteredTodos;
    }
  }
</script>

<main>
  <div class="todo">
    <h1>Todo list</h1>
    <AddTodo on:add={handelAddTodo} />
    <Filters on:filter={handleFilterTodo} />
    <div>
      <span>{remaining}/{filteredTodos.length}</span>
      <button on:click={handleAllCompleteTodo}>✓</button>
    </div>
    <ul>
      {#each filteredTodos as todo}
        <TodoItem {todo} on:delete={handleDeleteTodo} on:edit={handleEditTodo} />
      {/each}
    </ul>
    <button on:click={handleClearCompleteTodo}>Clear Completed</button>
  </div>
</main>

<style>
  main {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .todo {
    height: 100%;
    width: 320px;
    padding: 20px;
  }
</style>

일단 필터드했다가 되돌아가야하므로 필터드와 그냥 리스트 두개의 상태가 필요하다고 생각했음.
간단히 이렇게 하려했는데, 이때 수정을 todos로 하는데, 
todos가 바뀌면서 바뀐 todos로만 필터스가 할당되면서 필터링이 사라짐.
그래서 클릭시만이 아닌, 클릭후에도 유지가 필요하기때문에 현재 탭을 가리키는 상태가 필요함을 느낌.

그리고 스벨트 $는 기본적으로 사용된 변수가 바뀔때마다 실행됨. 그래서 처음엔 todos를 함수를 만들때 todos를 안넘겨주는 방식으로 만들었다가,
그렇게하면 인지를 못해서 파라미터로 넘겨주는 방식으로 변경. 사실 이게 좀 더 함수형에 가깝고 좋은 코드임

그리고 makeFilteredTodos의 코드, 미세팁에서 본대로 객체(맵)형식으로 하려했는데, 결국 todos를 파라미터로받아야 $를 인지하는데, 
맵의 값이 함수 형태가 돼야하는데, 오히려 스위치문이 단순하다 판단하여 유지.

잘했다고 생각한 것:
1. 탭컴포넌트 내에서는 js없이 css로만 클린된 것을 구현
2.기존 코드를 많이 안바꾸고, 필터를 구현
아쉬운 부분: 
1.스벨트의 key부분을 아직 이해못함. 그냥 안하면 돔 삭제 부분이 이상해서 넣어주니까 제대로 작동함. 
스벨트 문서에서는 돔이 정확한 엘리먼트을 찾는 것을 인지하게 해준다는데, 
아마 리액트의 키라고 생각하면 될텐데, 조금 다르게 동작하는 것 같아서 아직 잘 모르겠음.
2. 시간 오래걸림. 처음부터 상태가 필요하단 것을 인지못함. 근데 진짜로 있어야만 할까?
