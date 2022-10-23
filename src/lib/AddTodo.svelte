<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let input;
  let todoInputText;

  function focus() {
    input.focus();
  }

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

<input on:keydown={handleKeydown} bind:value={todoInputText} bind:this={input} placeholder="Add todo" />
<button on:click={onClickAddBtn}>Add</button>
