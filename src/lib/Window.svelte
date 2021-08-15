<script>
    import Drag from "./Drag.svelte";
    import "xp.css/dist/XP.css";
    import { createEventDispatcher } from "svelte";

    let dispatch = createEventDispatcher();
    export let id = 0;
    let x = Math.random() * 400;
    let y = Math.random() * 400;
    let minWidth = 200;
    let minHeight = 300;
    let width = minWidth;
    let height = minHeight;
    let maxWidth = 400;
    let maxHeight = 400;
    let borderWidth = 10;
    export let visible = true;
    let isMax = false;
    export let zLevel = 0;
    export let content = undefined;
    export let contentProps;

    $: (zLevel) => {
        if (zLevel == 1) {
            dispatch("clicked", {});
        }
    };

    const makeMax = () => {
        current = {
            x,
            y,
            width,
            height,
        };
        width = maxWidth;
        height = maxHeight;
    };

    const returnToNorm = () => {
        ({ width, height } = current);
    };

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

    let borderstyles = new Array(4).fill("0831d9");

    const handleBorderDown = (num, e) => {
        borderstyles[num] = "white";
        borderDown = true;
        setCurrentPosition(e);
    };

    const handleMinimize = (e) => {
        visible = !visible;
        if (!visible) {
            setCurrentPosition(e);
        } else {
            ({ x, y, width, height } = current);
        }
    };

    const handleMaximize = () => {
        isMax = !isMax;
        if (isMax) {
            makeMax();
        } else {
            returnToNorm();
        }
    };

    const handleClose = (e) => {
        dispatch("close", { id });
    };
</script>

<svelte:window
    on:mouseup={() => {
        borderstyles = borderstyles.map(() => "#0831d9");
        borderDown = false;
    }}
    on:mousemove={(e) => {
        if (borderDown) {
            let rx = Math.round(x);
            let ry = Math.round(y);
            let curr = { rx, ry, width, height };
            let draggingHorizontal =
                Math.sign(e.movementX) > 0 ? "right" : "left";
            let draggingVertical = Math.sign(e.movementY) > 0 ? "down" : "up";
            if (borderstyles[3] == "white") {
                if (
                    (draggingHorizontal == "left" && width < maxWidth) ||
                    (draggingHorizontal == "right" && width > minWidth)
                ) {
                    x += e.x - current.x;
                    width -= e.x - current.x;
                } else {
                    borderstyles = new Array(4).fill("#0831d9");
                }
            }
            if (borderstyles[1] == "white") {
                if (
                    (draggingHorizontal == "left" && width > minWidth) ||
                    (draggingHorizontal == "right" && width < maxWidth)
                ) {
                    width += e.movementX;
                } else {
                    borderstyles = new Array(4).fill("#0831d9");
                }
            }
            if (borderstyles[0] == "white") {
                if (
                    (draggingVertical == "up" && height < maxHeight) ||
                    (draggingVertical == "down" && height > minHeight)
                ) {
                    y += e.y - current.y;
                    height -= e.y - current.y;
                } else {
                    borderstyles = new Array(4).fill("#0831d9");
                }
            }
            if (borderstyles[2] == "white") {
                if (
                    (draggingVertical == "up" && height > minHeight) ||
                    (draggingVertical == "down" && height < maxHeight)
                ) {
                    height += e.movementY;
                } else {
                    borderstyles = new Array(4).fill("0831d9");
                }
            }
            rx = Math.round(x);
            ry = Math.round(y);
            if (curr != { rx, ry, width, height }) {
                isMax = false;
            }
            current = { x, y, width, height };
        }
    }}
/>
{#if visible}
    <div
        on:click={() => {
            dispatch("clicked", {});
        }}
        id="window-container"
        style="top:{y}px; left:{x}px; width:{width}px; height:{height + 10}px; 
    border-style: solid; 
    border-width: 4px;
    border-right-color: {borderstyles[1]};
    border-left-color: {borderstyles[3]};
    border-top-color: {borderstyles[0]};
    border-bottom-color: {borderstyles[2]};
    filter: brightness({zLevel * 100}%);"
        class="window"
        on:mousedown={(e) => {
            // current = { x, y, width, height };
            //dispatch("clicked", {});
            if (
                //@ts-ignore
                e.target.id == document.getElementById("window-container").id
            ) {
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
            }
        }}
    >
        <div class="title-bar">
            <Drag bind:x bind:y>
                <div on:dblclick={handleMaximize} class="title-bar-text name">
                    A Title Bar
                </div>
            </Drag>
            <div class="title-bar-controls">
                <button aria-label="Minimize" on:click={handleMinimize} />
                <button aria-label="Maximize" on:click={handleMaximize} />
                <button aria-label="Close" on:click={handleClose} />
            </div>
        </div>

        <!-- <h1>{id}</h1> -->
        <div class="window-body" id="window-body">
            <svelte:component
                this={content}
                on:mounted={(e) => {
                    maxHeight = e.detail.maxHeight;
                    maxWidth = e.detail.maxWidth;
                    minHeight = e.detail.minHeight;
                    minWidth = e.detail.minWidth;
                    height = minHeight;
                    width = minWidth;
                }}
                {...contentProps}
            />
        </div>
    </div>
{/if}

<style>
    .container {
        background-color: red;
        height: 84%;
        overflow: hidden;
    }
    .container > * {
        background-color: red;
        height: 84%;
        overflow: hidden;
    }
    .name {
        display: flex;
        flex-grow: 1;
        overflow: hidden;
        padding-top: 4px;
        height: 20px;
    }

    .window {
        user-select: none;
        z-index: 99999999999999999999999999999999999999999999999999999;
        /* background-color: purple; */
        position: absolute;
        color: white;
        overflow: hidden;
        padding: 4px;
    }

    .window-body {
        overflow: hidden;
        width: 96%;
        height: 89.5%;
        color: black;
        /* margin:2%; */
    }
    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
        overflow: visible;
    }

    /* Works on Chrome, Edge, and Safari
   

    *::-webkit-scrollbar-track {
        background: white;
    }

    *::-webkit-scrollbar-thumb {
        background-color: blue;
        border-radius: 20px;
        border: 3px solid white;
    } */
</style>
