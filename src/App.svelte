<script>
  import Drag from "./lib/Drag.svelte";
  let x = 100;
  let y = 100;
  let width = 200;
  let height = 200;
  let minWidth = 100;
  let minHeight = 100;
  let maxWidth = 300;
  let maxHeight = 300;
  let borderWidth = 20;

  let borderDown = false;

  const setCurrentPosition = (/** @type {{ x: any; y: any; }} */ e) => {
    current = {
      x: e.x,
      y: e.y,
      width,
      height,
    };
  };

  let current = {
    x,
    y,
    width,
    height,
  };
  // function to add two nums

  let borderstyles = new Array(4).fill(0);

  const handleBorderDown = (num, e) => {
    borderstyles[num] = "2";
    borderDown = true;
    setCurrentPosition(e);
  };
</script>

<svelte:window
  on:mouseup={() => {
    borderstyles = borderstyles.map(() => 0);
    borderDown = false;
  }}
  on:mousemove={(e) => {
    
    if (borderDown) {
      let draggingHorizontal = Math.sign(e.movementX) > 0 ? "right" : "left";
      let draggingVertical = Math.sign(e.movementY) > 0 ? "down" : "up";
      if (borderstyles[3]) {
        if (
          (draggingHorizontal == "left" && width < maxWidth) ||
          (draggingHorizontal == "right" && width > minWidth)
        ) {
          x += e.x - current.x;
          width -= e.x - current.x;
        } else {
          borderstyles = new Array(4).fill(0);
        }
      }
      if (borderstyles[1]) {
        if (
          (draggingHorizontal == "left" && width > minWidth) ||
          (draggingHorizontal == "right" && width < maxWidth)
        ) {
          width += e.movementX;
        } else {
          borderstyles = new Array(4).fill(0);
        }
      }
      if (borderstyles[0]) {
        if (
          (draggingVertical == "up" && height < maxHeight) ||
          (draggingVertical == "down" && height > minHeight)
        ) {
          y += e.y - current.y;
          height -= e.y - current.y;
        } else {
          borderstyles = new Array(4).fill(0);
        }
      }
      if (borderstyles[2]) {
        if (
          (draggingVertical == "up" && height > minHeight) ||
          (draggingVertical == "down" && height < maxHeight)
        ) {
          height += e.movementY;
        } else {
          borderstyles = new Array(4).fill(0);
        }
      }

      current = { x, y, width, height };
    }
  }}
/>

<section class="main">
  <div
    style="top:{y}px; left:{x}px; width:{width}px; height:{height}px;  border-width: {borderstyles
      .map((a) => a + 'px ')
      .reduce((a, curr) => {
        a += curr;
        return a;
      }, '')};
      border-style: solid; 
      border-color: white;"
    class="window"
    on:mousedown={(e) => {
      if (e.offsetX < borderWidth) {
        handleBorderDown(3, e);
      }
      if (e.offsetY < borderWidth) {
        handleBorderDown(0, e);
      }
      if (e.offsetX > width - borderWidth) {
        handleBorderDown(1, e);
      }
      if (e.offsetY > height - borderWidth) {
        handleBorderDown(2, e);
      }
    }}
  >
    <div class="drag-container" on:mousedown|stopPropagation>
      <Drag bind:x bind:y />
    </div>
  </div>
</section>

<style>
  .main {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    background-color: black;
    min-height: 100vh;
  }
  .window {
    width: 200px;
    height: 200px;
    background-color: green;
    position: absolute;
  }
  .drag-container {
    width: 80%;
    height: 20%;
    margin: 10%;
    position: absolute;
  }
</style>
