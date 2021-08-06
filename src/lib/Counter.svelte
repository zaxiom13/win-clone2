<script>
  // import { getStore } from './hmr-stores'
  // /** @type { string } */
  // export let id
  

  var count = 0;
  const increment = () => {
    count += 1
  }
</script>

<button on:click={increment}>
  Clicks: {count}
</button>