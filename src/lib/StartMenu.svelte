<script>
    import { onMount } from "svelte/internal";

    // import the open window function from store
    import { open } from "../store.js";

    export let depth = 0;
    export let showSubMenu = false;
    export let submenu = {
        "About me": "About",
        "Some items": {
            submenu: {
                "Calc boy": "Calculator",
                "todo": "Todo",
                // add another submenu
                "more items": {
                    submenu: {
                        "helpererino": "Help",
                        "clock man": "Timer",
                        "Seddings": "Settings",
                        "noterinos": "Notes",
                    },
                    showSubMenu: false,
                },
            },
            showSubMenu: false,
        },
    };

    function handleLeave(entry) {
        entry.showSubMenu = false;
        submenu = submenu;
    }

    function handleEnter(entry) {
        entry.showSubMenu = true;
        submenu = submenu;
    }

    onMount(() => {});

    function openWindow(title) {
        open(title);
    }
</script>

<!-- style such that depth moves submenu to the right to accomodate already present submenu -->
{#if depth === 0 || showSubMenu}
    <div
        class="menu"
        style="left: {depth == 0 ? 0 : 100}px;
     bottom: {depth == 0 ? 40 : 0}px"
    >
        {#each Object.entries(submenu) as [title, entry]}
            <div
                class="menu-item"
                on:mouseleave={() => {
                    if (typeof entry === "object") handleLeave(entry);
                }}
                on:mouseenter={() => {
                    if (typeof entry === "object") handleEnter(entry);
                }}
                on:click={() => {
                    if (typeof entry !== "object") openWindow(entry);
                }}
            >
                {title}

                {#if typeof entry === "object"}
                    {#key entry.showSubMenu}
                        <svelte:self
                            {...entry}
                            depth={depth + 1}
                            showSubMenu={entry.showSubMenu}
                        />
                    {/key}
                {/if}
            </div>
        {/each}
    </div>
{/if}

<style>
    .menu {
        position: absolute;
        /* left: 10px; */
        width: 100px;
        background: #fff;
        display: flex;
        flex-direction: column-reverse;
        bottom: 40.5px;
        /* top: auto; */
        /* margin-bottom: 1px; */
    }

    .menu-item {
        height: 33px;
        background: #fff;

        color: #000;
        border-bottom: 1px solid #ccc;
    }

    /* hover menu should darken */
    .menu-item:hover {
        background: #eee;
    }
</style>
