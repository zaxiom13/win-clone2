<script>
  export let x = 100;
  export let y = 100;
  let currentX = 100;
  let currentY = 100;
  let mousedown = false;
</script>

<svelte:window
  on:mousemove={(e) => {
    if (mousedown) {
      x = e.x - currentX;
      y = e.y - currentY;
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
  on:mousedown={(e) => {
    currentX = e.x - x;
    currentY = e.y - y;
    mousedown = true;
  }}
  on:dragstart={() => {
    return false;
  }}
  on:drop={() => {
    return false;
  }}
>
  <slot />
</div>

<style>
  .drag {
    display: flex;
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>
