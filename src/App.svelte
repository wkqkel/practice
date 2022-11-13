<script>
  import AddTodo from "./lib/AddTodo.svelte";
  import Filters from "./lib/Filters.svelte";
  import DisplayWithBtn from "./lib/DisplayWithBtn.svelte";
  import TodoItem from "./lib/TodoItem.svelte";

  const INITIAL_TODO_LIST = [
    { id: 0, title: "스벨트 공부", done: false },
    { id: 1, title: "리액트 공부", done: false },
    { id: 2, title: "자바스크립트 공부", done: false },
  ];

  let todos = [...INITIAL_TODO_LIST];

  let currentTab = "all";
  $: filteredTodos = makeFilteredTodos(currentTab, todos);
  $: remaining = filteredTodos.filter((todo) => todo.done).length;
  $: display = `${remaining}:${filteredTodos.length}`;
 
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

  function handleToggleAllDoneTodo(e) {
    const done = e.detail;
    todos = todos.map((todo) => ({ ...todo, done }));
  }

  function makeFilteredTodos(tab, todos) {
    switch (tab) {
      case "all":
        return todos;
      case "active":
        return todos.filter((todo) => !todo.done);
      case "completed":
        return todos.filter((todo) => todo.done);
    }
  }
</script>

<main>
  <div class="todo">
    <h1>Todo list</h1>
    <AddTodo on:add={handelAddTodo} />
    <Filters bind:currentTab />
    <DisplayWithBtn {display} on:toggleAll={handleToggleAllDoneTodo} />
    <ul>
      {#each filteredTodos as todo (todo.id)}
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
