<script>
  import { createEventDispatcher } from "svelte";

  export let display;
  const dispatch = createEventDispatcher();

  const onClick = (e) => {
    dispatch("toggleAll", e.target.checked);
  };
</script>

<div>
  <span>{display}</span>
  <input type="checkbox" on:click={onClick} id="toggleAllDone" />
  <button>
    <label for="toggleAllDone">v</label>
  </button>
</div>

<style>
  input[type="checkbox"] {
    display: none;
  }
  button:has(label[for="toggleAllDone"]) {
    padding: 0;
  }
  label[for="toggleAllDone"] {
    padding: 5px;
  }
</style>
