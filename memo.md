TODO 기본구조 및 네이밍 참고 -리액트 공식문서 beta 3번문제
https://beta.reactjs.org/learn/updating-arrays-in-state

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

```
  export let todo;
  $: ({ id, done, title } = todo);
  $: inputValue = title;
```

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
