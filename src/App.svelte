<script>
  import Window from "./lib/Window.svelte";
  
  import compA from "./lib/CompA.svelte";

  let windowTilesProps = [
    {
      content: compA,
      contentProps: { propA: "propAafkjsldfkjsdlfij" },
      visible: true,
    },
    { content: compA, contentProps: { propA: "propA" }, visible: true },
    { content: compA, contentProps: { propA: "propA" }, visible: true },
    { content: compA, contentProps: { propA: "propA" }, visible: false },
  ].map((i, index) => {
    return { ...i, id: index };
  });

  let menu = ["item1", "item2", "item3", "item4", "item5"];
  let isShowMenu = false;

  let visibleItems = windowTilesProps.filter((i) => i.visible);
  $: visibleItems = windowTilesProps.filter((i) => i.visible);

  const createNewTile = () => {
    windowTilesProps = [
      ...windowTilesProps,
      {
        content: undefined,
        contentProps: { propA: undefined },
        visible: true,
        id: Math.max(...windowTilesProps.map((i) => i.id)) + 1,
      },
    ];
  };

  const showMenu = () => {
    isShowMenu = !isShowMenu;
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
    <Window
      on:clicked={() => {
        moveItemToLast(props.id);
        windowTilesProps = windowTilesProps;
      }}
      content={props.content}
      contentProps={props.contentProps}
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
    <div
      class="start-menu-button"
      on:click={showMenu}
      tabindex="-1"
      on:blur={() => {
        isShowMenu = false;
      }}
    >
      <h1>start</h1>
      {#if isShowMenu}
        <div class="start-menu">
          {#each menu as item}
            <div class="start-menu-item" on:click={createNewTile}>{item}</div>
          {/each}
        </div>
      {/if}
    </div>
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
  .start-menu-item {
    padding: 10px 70px;
    background-color: red;
    color: rgb(38, 38, 134);
  }

  .start-menu-item:hover {
    background-color: white;
  }

  .start-menu {
    display: flex;
    flex-direction: column-reverse;
    position: absolute;
    bottom: 7vh;
    width: 30px;
    background-color: pink;
  }
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
    user-select: none;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    background-color: black;
    min-height: 100vh;
    display: flex;
    flex-direction: column-reverse;
  }
</style>
