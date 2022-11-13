<script>
  export let currentTab;

  const TABS_LIST = ["all", "active", "completed"];
</script>

<div>
  {#each TABS_LIST as value (value)}
    <label>
      <input type="radio" {value} name="tabs" bind:group={currentTab} />
      {value}
    </label>
  {/each}
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
  label:has(input[name="tabs"]:checked) {
    text-decoration: underline;
  }
</style>
