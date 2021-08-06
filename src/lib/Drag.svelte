<script>
  export let x = 100;
  export let y = 100;
  let width = 100;
  let height = 100;
  let mousedown = false;
</script>

<svelte:window
  on:mousemove={(e) => {
    if (mousedown) {
      x = e.x - width / 2;
      y = e.y - height / 2;
    }
  }}
  on:mouseup={() => {
    mousedown = false;
  }}
  on:drop={(e) => {
    e.preventDefault();
    mousedown = false;
  }}
/>

<div
  class="drag"
  on:mousedown={() => {
    mousedown = true;
     
  }}
  on:dragstart={() => {
    return false;
  }}
  on:drop={() => {
    return false;
  }}
/>

<style>
  .drag {
    display: flex;
    width: 100%;
    height: 100%;

    background-color: red;
  }
</style>
