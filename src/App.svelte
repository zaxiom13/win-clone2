<script>
  import Window from "./lib/Window.svelte";

  let windowTilesProps = [
    { tileType: Window, visible: true },
    { tileType: Window, visible: true },
    { tileType: Window, visible: true },
    { tileType: Window, visible: false },
  ];

  const makeVisible = (index) => {
    windowTilesProps[index].visible = true;
  };
</script>

<section class="main">
  {#each windowTilesProps as props}
    <svelte:component this={props.tileType} bind:visible={props.visible} />
  {/each}
  <div class="taskbar">
    <div class="start-menu-button" />
    {#each windowTilesProps as props, index}
      {#if props.visible != true}
        <div class="minimised-tile" on:click={() => makeVisible(index)}>
          aadsdasd
        </div>
      {/if}
    {/each}
  </div>
</section>

<style>
  .minimised-tile {
    width: 100px;
    height: 100%;
    margin-right: 30px;
    background-color: bisque;
  }
  .taskbar {
    width: 100%;
    height: 7.5vh;
    background-color: rgb(38, 38, 134);
    display: flex;
    flex-direction: row;
  }
  .main {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    background-color: black;
    min-height: 100vh;
    display: flex;
    flex-direction: column-reverse;
  }
</style>
