<script>
    let display = "0";

    function updateDisplay(num) {
        if (display === "0") {
            display = num;
        } else {
            display += num.toString();
        }
    }

    function clearDisplay() {
        display = "0";
    }

    function calculate() {
        display = eval(display);
    }
</script>

<div class="calculator">
    <div class="display">{display}</div>
    <div class="row">
        <div class="button">MC</div>
        <div class="button">MR</div>
        <div class="button">MS</div>
        <div class="button">M+</div>
        <!-- just pop off the rightmost character of display -->
        <div
            class="button button-blue"
            on:click={() => (display = display.toString().slice(0, -1))}
        >
            ←
        </div>
    </div>
    <div class="row">
        <div class="button button-blue" on:click={() => clearDisplay()}>CE</div>
        <div class="button button-blue" on:click={() => clearDisplay()}>C</div>
        <div
            class="button button-blue"
            on:click={() => {
                display = "1/" + display;
                calculate();
            }}
        >
            1/x
        </div>
        <div
            class="button button-blue"
            on:click={() => (display = Math.sqrt(eval(display)).toString())}
        >
            √
        </div>
        <div class="button button-blue">%</div>
    </div>
    <div class="row">
        <div class="button" on:click={() => updateDisplay(7)}>7</div>
        <div class="button" on:click={() => updateDisplay(8)}>8</div>
        <div class="button" on:click={() => updateDisplay(9)}>9</div>
        <div class="button button-blue" on:click={() => updateDisplay("/")}>
            /
        </div>
    </div>
    <div class="row">
        <div class="button" on:click={() => updateDisplay(4)}>4</div>
        <div class="button" on:click={() => updateDisplay(5)}>5</div>
        <div class="button" on:click={() => updateDisplay(6)}>6</div>
        <div class="button button-blue" on:click={() => updateDisplay("*")}>
            *
        </div>
    </div>
    <div class="row">
        <div class="button" on:click={() => updateDisplay(1)}>1</div>
        <div class="button" on:click={() => updateDisplay(2)}>2</div>
        <div class="button" on:click={() => updateDisplay(3)}>3</div>
        <div class="button button-blue" on:click={() => updateDisplay("-")}>
            -
        </div>
    </div>
    <div class="row">
        <div class="button" on:click={() => updateDisplay(0)}>0</div>
        <div class="button" />
        <div class="button" on:click={() => calculate()}>=</div>
        <div class="button button-blue" on:click={() => updateDisplay("+")}>
            +
        </div>
    </div>
</div>

<style>
    /* You can adjust the style here */
    .calculator {
        width: 240px;
        background-color: #c0c0c0;
        border: 4px outset #808080;
        font-family: Arial, sans-serif;
        font-size: 14px;
        display: flex;
        flex-direction: column;
        position: absolute;
        left: 10%;
    }

    .display {
        width: 224px;
        background-color: #ffffff;
        border: 2px inset #808080;
        text-align: right;
        font-size: 24px;
        padding: 4px;
        height: 24px;
    }

    .row {
        display: flex;
        flex-direction: row;
        font-size: medium;
        font-family: "Courier New", Courier, monospace;
    }

    .button {
        width: 48px;
        height: 32px;
        margin: 4px;
        background-color: #e0e0e0;
        border: 2px outset #808080;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
    }

    .button:hover {
        border-style: inset;
    }

    .button-blue {
        background-color: #8080ff;
        color: white;
    }
</style>
