<script>
  import Window from "./lib/Window.svelte";

  let windowTilesProps = [
    { tileType: Window, visible: true },
    { tileType: Window, visible: true },
    { tileType: Window, visible: true },
    { tileType: Window, visible: false },
  ].map((i, index) => {
    return { ...i, id: index };
  });

  let visibleItems = [];
  $: visibleItems = windowTilesProps.filter((i) => i.visible);

  const createNewTile = () => {
    windowTilesProps = [
      ...windowTilesProps,
      {
        tileType: Window,
        visible: true,
        id: Math.max(...windowTilesProps.map((i) => i.id)) + 1,
      },
    ];
  };

  const moveItemToLast = (index) => {
    windowTilesProps.push(
      windowTilesProps.splice(
        windowTilesProps.findIndex((v) => v.id == index),
        1
      )[0]
    );
  };

  const makeVisible = (index) => {
    windowTilesProps[
      windowTilesProps.findIndex((obj) => obj.id == index)
    ].visible = true;

    moveItemToLast(index);
  };
  windowTilesProps = windowTilesProps;
</script>

<section class="main">
  {#each windowTilesProps as props, index (props.id)}
    <svelte:component
      this={props.tileType}
      on:clicked={() => {
        moveItemToLast(props.id);
        windowTilesProps = windowTilesProps;
      }}
      bind:visible={props.visible}
      zLevel={Math.max(((index + 1) / visibleItems.length) ** 2, 0.3)}
      on:close={(e) => {
        windowTilesProps = windowTilesProps.filter(
          (item) => item.id !== e.detail.id
        );
      }}
      id={props.id}
    />
  {/each}
  <div class="icons" on:click={createNewTile}>icon</div>
  <div class="taskbar">
    <div class="start-menu-button"><h1>start</h1></div>
    {#each windowTilesProps as props, index (props.id)}
      {#if props.visible != true}
        <div class="minimised-tile" on:click={() => makeVisible(props.id)}>
          <h1>
            {props.id}
          </h1>
        </div>
      {/if}
    {/each}
  </div>
</section>

<style>
  .start-menu-button {
    width: 100px;
    color: green;
  }
  .icons {
    width: 100px;
    height: 100px;
    background-color: white;
    position: absolute;
    bottom: 300px;
    left: 40px;
  }
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
