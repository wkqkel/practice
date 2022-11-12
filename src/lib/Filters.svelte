<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  const onClick = (e) => {
    const type = e.target.id;
    dispatch("filter", type);
  };
</script>

<div>
  <input type="radio" id="all" name="tabs" on:click={onClick} checked />
  <label for="all">all</label>
  <input type="radio" id="active" name="tabs" on:click={onClick} />
  <label for="active">active</label>
  <input type="radio" id="completed" name="tabs" on:click={onClick} />
  <label for="completed">completed</label>
</div>

<style>
  div {
    margin: 8px 0px;
  }
  input[name="tabs"] {
    display: none;
  }
  label {
    cursor: pointer;
    padding: 4px 12px;
  }
  input[name="tabs"]:checked + label {
    text-decoration: underline;
  }
</style>
