<script>
  import StyledButton from "../components/StyledButton.svelte";
  import { createEventDispatcher } from "svelte";
  export let todo;

  let inputValue = todo.title;
  let isEditing = false;

  const dispatch = createEventDispatcher();

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
  };

  const onClickCancelBtn = () => {
    inputValue = todo.title;
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
    opacity: 0.4;
    text-decoration: line-through black;
  }

</style>
