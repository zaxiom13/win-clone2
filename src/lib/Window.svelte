<svelte:options immutable={true} />
<script>
    import TitleBar from "./TitleBar.svelte";
    import { close } from "../store.js";


    export let title = "Untitled - Notepad";
    export let id = 0;
    export let component = null;

    // we want position and size to be dynamic
    // so we'll use variables
    let x = 0;
    let y = 0;
    let width = 600;
    let height = 200;

    // now let's make the window draggable
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    // now let's make the window resizable
    let isResizing = "center";
    let startWidth = 0;
    let startHeight = 0;

    // set a minimum size
    const minWidth = 300;
    const minHeight = 200;

    function handleMousedown(event) {
        // set dragging to true
        event = event.detail;
        isDragging = true;
        // set the offset
        startX = event.offsetX;
        startY = event.offsetY;
    }

    function handleMousemove(event) {
        if (isResizing !== "center") {
            // prevent text selection during drag
            event.preventDefault();

            // resize based on the direction
            let newHeight;
            let newWidth;
            if (isResizing.includes("top")) {
                newHeight = startHeight - (event.clientY - startY);
                if (
                    newHeight < minHeight ||
                    (y + newHeight > window.innerHeight && newHeight > height)
                )
                    return;
                y = event.clientY;
                height = newHeight;
            }
            if (isResizing.includes("bottom")) {
                newHeight = startHeight + (event.clientY - startY);
                if (
                    newHeight < minHeight ||
                    (y + height > window.innerHeight - 60 && newHeight > height)
                )
                    return;
                height = newHeight;
            }
            if (isResizing.includes("left")) {
                newWidth = startWidth - (event.clientX - startX);
                if (
                    newWidth < minWidth ||
                    (x + newWidth > window.innerWidth && newWidth > width)
                )
                    return;
                x = event.clientX;
                width = newWidth;
            }
            if (isResizing.includes("right")) {
                newWidth = startWidth + (event.clientX - startX);
                if (
                    newWidth < minWidth ||
                    (x + width > window.innerWidth && newWidth > width)
                )
                    return;
                width = newWidth;
            }
            return;
        } else if (isDragging) {
            x = Math.min(
                Math.max(event.clientX - startX, 0),
                window.innerWidth - width
            );
            y = Math.min(
                Math.max(event.clientY - startY, 0),
                window.innerHeight - height - 60
            );
            return;
        }
    }

    function handleMouseup(event) {
        // set dragging to false
        isDragging = false;
        startX = 0;
        startY = 0;
        startHeight = 0;
        startWidth = 0;
        isResizing = "center";
    }

    function handleMousedownResize(event) {
        // set dragging to true
        console.log("mousedownResize");
        console.log(event);
        // check if the mouse is in any of the resize areas
        // if so, set isResizing to true

        isResizing = getCompassDirectionAndNearEdge(event);
        console.log(isResizing);
        // set the offset
        if (isResizing === "center") {
            return;
        }
        startWidth = width;
        startHeight = height;
        startX = event.clientX;
        startY = event.clientY;
    }

    function getCompassDirectionAndNearEdge(event) {
        // bounding box of the element
        const rect = event.target.getBoundingClientRect();
        // width and height of the element
        const w = width;
        const h = height;

        // use the natural offset of the mouse
        const x = event.offsetX;
        const y = event.offsetY;

        const tolerance = 20;
        const isNearLeft = x < tolerance;
        const isNearRight = w - x < tolerance;
        const isNearTop = y < tolerance;
        const isNearBottom = h - y < tolerance;
        const isNearTopLeft = isNearLeft && isNearTop;
        const isNearTopRight = isNearRight && isNearTop;
        const isNearBottomLeft = isNearLeft && isNearBottom;
        const isNearBottomRight = isNearRight && isNearBottom;
        const isNearLeftEdge = isNearLeft && !isNearTop && !isNearBottom;
        const isNearRightEdge = isNearRight && !isNearTop && !isNearBottom;
        const isNearTopEdge = isNearTop && !isNearLeft && !isNearRight;
        const isNearBottomEdge = isNearBottom && !isNearLeft && !isNearRight;
        const isNearCenter =
            !isNearLeft && !isNearRight && !isNearTop && !isNearBottom;
        if (isNearTopLeft) {
            return "top-left";
        } else if (isNearTopRight) {
            return "top-right";
        } else if (isNearBottomLeft) {
            return "bottom-left";
        } else if (isNearBottomRight) {
            return "bottom-right";
        } else if (isNearLeftEdge) {
            return "left";
        } else if (isNearRightEdge) {
            return "right";
        } else if (isNearTopEdge) {
            return "top";
        } else if (isNearBottomEdge) {
            return "bottom";
        } else if (isNearCenter) {
            return "center";
        }
    }

    function closeWindow() {
        console.log("close window");
        close(id);
    }
</script>

<!-- track mouse during drag -->
<svelte:window on:mousemove={handleMousemove} on:mouseup={handleMouseup} />
<!-- keyed svelte -->

<div
    class="window"
    on:mousedown|self={handleMousedownResize}
    style="left: {x}px; top: {y}px; width: {width}px; height: {height}px;"
>
    <div class="window-main">
        <TitleBar title={title + " " + id} on:mouseDown={handleMousedown} on:close={closeWindow} />

        <div class="content" style="height: {height - 30}px;">
            <svelte:component this={component} />
        </div>
    </div>
</div>

<style>
    .content {
        background: #d3d3d3;
        color: black;
    }
    .window {
        background: #fff;
        border: 10px solid #c3c3c3;
        border-radius: 0.3rem;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        position: absolute;
    }

    .content {
        padding-block: 10px;
        /* inherit the height of the parent */
        height: 100%;
        user-select: none;
    }
</style>
