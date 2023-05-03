<script lang="js">
  // @ts-nocheck
  import StartMenu from "./lib/StartMenu.svelte";
  import Window from "./lib/Window.svelte";

  // import list of open windows from store
  import { openWindows } from "./store.js";

  let showMenu = false;
</script>

<!-- Desktop.svelte -->
<div class="desktop" on:click={() => (showMenu = false)}>
  <div class="background" style={"color:white"} />

  {#each $openWindows as window (window.id)}
    <Window
      title={window.app.name}
      id={window.id}
      component={window.app.component}
    />
  {/each}

  <div class="taskbar">
    <div
      class="startup-menu"
      on:click|stopPropagation|self={() => (showMenu = !showMenu)}
    >
      Start
      {#if showMenu}
        <StartMenu />
      {/if}
    </div>
  </div>
</div>

<style>
  .desktop {
    position: relative;
    width: 100vw;
    height: 100vh;
    background: #000;
    user-select: none;
  }

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    filter: blur(5px);
  }

  .taskbar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40px;
    background: #0a27cc;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .startup-menu {
    position: absolute;

    left: 0;
    height: 40px;
    background: green;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
  }
</style>
