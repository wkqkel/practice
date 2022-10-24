<script>
  import StyledButton from "../components/StyledButton.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let input;
  let todoInputText;

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
  <StyledButton>Add</StyledButton>
</form>

