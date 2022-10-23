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
