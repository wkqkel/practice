<script>
  export let props ={};
</script>

<button {...props} ><slot /></button>

<style>
     button {
        background: #4082f0;
        color:white;
        border: 0;
        cursor: pointer;
        border-radius: 4px;
        padding: 8px 12px;
    }
</style>