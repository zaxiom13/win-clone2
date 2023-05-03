<script>
    // import event dispatcher
    import { createEventDispatcher } from "svelte";

    // create event dispatcher
    const dispatch = createEventDispatcher();

    // dispatch event on mousedown to Window.svelte
    function handleMousedown(event) {
        dispatch("mouseDown", event);
    }

    export let title = "Untitled - Notepad";

    function handleClose() {
        dispatch("close");
    }
</script>

<div class="titlebar">
    <div class="title" on:mousedown={handleMousedown} >{title}</div>
    <div class="title-bar-buttons">
        <button class="title-bar-button minimize-button">-</button>
        <button class="title-bar-button maximize-button">[]</button>
        <button class="title-bar-button close-button" on:click={handleClose}>x</button>
    </div>
</div>

<style>
    .title-bar-buttons {
        display: flex;
        align-items: center;
        height: 100%;
    }

    .title-bar-button {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 5px;
        border-radius: 3px;
        cursor: pointer;
        transition: background 0.2s;
        color: #4d4d4d;
        /* make button height fit parent */
        height: 100%;
    }

    .title-bar-button:hover {
        background: #ddd;
    }
    .titlebar {
        background: linear-gradient(#f2f2f2, #d9d9d9);
        border-bottom: 1px solid #c3c3c3;
        height: 25px;
        display: flex;
    }
    .title {
        color: #4d4d4d;
        float: left;
        font-size: 12px;
        line-height: 25px;
        margin-left: 5px;
        flex: 1 1 0;
        user-select: none;
        overflow: hidden;
    }
</style>
