<script>
  import AddTodo from "./lib/AddTodo.svelte";
  import TodoItem from "./lib/TodoItem.svelte";

  const INITIAL_TODO_LIST = [
    { id: 0, title: "스벨트 공부", done: false },
    { id: 1, title: "리액트 공부", done: false },
    { id: 2, title: "자바스크립트 공부", done: false },
  ];

  let todos = [...INITIAL_TODO_LIST];

  function handelAddTodo(e) {
    const todoInputText = e.detail;
    todos = [...todos, { id: todos.length, title: todoInputText, done: false }];
  }
  function handleEditTodo(e) {
    const newTodo = e.detail;
    todos = todos.map((todo) => (todo.id === newTodo.id ? newTodo : todo));
  }
  function handleDeleteTodo(e) {
    const id = e.detail;
    todos = todos.filter((todo) => todo.id !== id);
  }
</script>

<main>
  <div class="todo">
    <h1>Todo list</h1>
    <AddTodo on:add={handelAddTodo} />
    <ul>
      {#each todos as todo (todo.id)}
        <TodoItem {todo} on:delete={handleDeleteTodo} on:edit={handleEditTodo} />
      {/each}
    </ul>
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
