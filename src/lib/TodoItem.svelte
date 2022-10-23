<script>
  import { createEventDispatcher } from "svelte";
  export let todo;

  let inputValue = todo.title;

  const dispatch = createEventDispatcher();
  let isEditing = false;

  const toggleIsEditing = () => {
    isEditing = !isEditing;
  };

  const onClickDeleteBtn = () => {
    dispatch("delete", todo.id);
  };

  const onClickSaveBtn = () => {
    dispatch("edit", { ...todo, title: inputValue });
    toggleIsEditing();
  };

  const onClickEditBtn = () => {
    toggleIsEditing();
    inputValue = todo.title;
  };

  const onClickCancelBtn = () => {
    toggleIsEditing();
  };
</script>

<li class:done={todo.done}>
  <input type="checkbox" bind:checked={todo.done} />
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
    text-decoration: line-through red;
  }
</style>
