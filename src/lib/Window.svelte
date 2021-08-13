<script>
    import Drag from "./Drag.svelte";
    import "xp.css/dist/XP.css";
    import { createEventDispatcher } from "svelte";

    let dispatch = createEventDispatcher();
    export let id = 0;
    export let x = Math.random()*400;
    export let y = Math.random()*400;
    export let width = 200;
    export let height = 200;
    export let minWidth = 100;
    export let minHeight = 100;
    export let maxWidth = 300;
    export let maxHeight = 300;
    export let borderWidth = 20;
    export let visible = true;
    export let isMax = false;
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

    let borderstyles = new Array(4).fill(0);

    const handleBorderDown = (num, e) => {
        borderstyles[num] = "2";
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
        borderstyles = borderstyles.map(() => 0);
        borderDown = false;
    }}
    on:mousemove={(e) => {
        if (borderDown) {
            isMax = false;
            let draggingHorizontal =
                Math.sign(e.movementX) > 0 ? "right" : "left";
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
{#if visible}
    <div
        on:click={() => {
            dispatch("clicked", {});
        }}
        id="window-container"
        style="top:{y}px; left:{x}px; width:{width}px; height:{height}px;  border-width: {borderstyles
            .map((a) => a + 'px ')
            .reduce((a, curr) => {
                a += curr;
                return a;
            }, '')};
    border-style: solid; 
    border-color: white;
    opacity: {zLevel};"
        class="window"
        on:mousedown={(e) => {
            dispatch("clicked", {});
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
        <Drag bind:x bind:y >

           
                <div class="title-bar-text name">A Title Bar</div>
                <div class="title-bar-controls">
                    <button aria-label="Minimize" on:click={handleMinimize}></button>
                    <button aria-label="Maximize" on:click={handleMaximize}></button>
                    <button aria-label="Close" on:click={handleClose}></button>
                </div>
                
            </Drag>
        </div>
     
         
            
           
            <h1>{id}</h1>

            <svelte:component this={content} {...contentProps} />
        
    </div>
{/if}

<style>
    .name{
        display: flex;
        flex-grow:1;
    }


    .inner {
        margin: 5% 5%;
        /* border-width: 10px;
        border-color: red;
        border-style: solid; */
        /* max-width: 80%;
        max-height: 80%; */
        height: 90%;
        width: 90%;
        top: -0%;
        left:-0%;
        position: absolute;
        background-color: purple;
        overflow: scroll;
    }
    .buttons {
        margin-top: 10px;
        display: flex;
        /* overflow: hidden; */
    }
    .maximize {
        /* margin: 100px; */
    }
    .window {
        user-select: none;
        z-index: 99999999999999999999999999999999999999999999999999999;
        background-color: purple;
        position: absolute;
        color: white;
        overflow: scroll;
    }
    .drag-container {
        width: 100%;
        height: 20px;
        //margin-top: 5px;
    }

    /* Works on Chrome, Edge, and Safari */
    *::-webkit-scrollbar {
        width: 8px;
        height: 8px;
        overflow: visible;
    }

    *::-webkit-scrollbar-track {
        background: white;
    }

    *::-webkit-scrollbar-thumb {
        background-color: blue;
        border-radius: 20px;
        border: 3px solid white;
    }
</style>
