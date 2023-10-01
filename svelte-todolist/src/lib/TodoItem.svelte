<script>
  import { createEventDispatcher } from "svelte";
  export let todo;

  let inputValue = todo.title;
  let isEditing = false;

  const dispatch = createEventDispatcher();

  const toggleIsEditing = () => {
    isEditing = !isEditing;
  };

  const onClickDoneBtn = () => {
    dispatch("edit", { ...todo, done: !todo.done });
  };

  const onClickSaveBtn = () => {
    dispatch("edit", { ...todo, title: inputValue });
    toggleIsEditing();
  };

  const onClickCancelBtn = () => {
    inputValue = todo.title;
    toggleIsEditing();
  };

  const onClickEditBtn = () => {
    toggleIsEditing();
  };

  const onClickDeleteBtn = () => {
    dispatch("delete", todo.id);
  };
</script>

<li class:done={todo.done}>
  <input type="checkbox" checked={todo.done} on:change={onClickDoneBtn} />
  {#if isEditing}
    <input bind:value={inputValue} />
    <button on:click={onClickSaveBtn}>save</button>
    <button on:click={onClickCancelBtn}>cancel</button>
  {:else}
    <span>{todo.title}</span>
    <button on:click={onClickEditBtn}>edit</button>
    <button on:click={onClickDeleteBtn}>delete</button>
  {/if}
</li>

<style>
  li {
    list-style-type: none;
  }
  .done span {
    opacity: 0.4;
    text-decoration: line-through black;
  }
</style>
