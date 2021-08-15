<script>
    let size1 = 3;
    let size2 = 3;

    let turn = 0;

    let gameOver = false;

    var x = new Array(size1);

    for (let i = 0; i < x.length; i++) {
        x[i] = new Array(size2);
    }
    const handleClick = (i, j) => {
        let player = turn % 2 == 0 ? "x" : "o";
        if (x[i] && x[i][j]) {
            return;
        }
        x[i][j] = player;
        gameOver = true;

        for (let i = 0; i < x.length; i++) {
            let row = x[i];
            for (let j = 0; j < row.length; j++) {
                let el = row[j];
                if (!el) {
                    gameOver = false;
                    break;
                }
            }
        }

        turn++;
    };

    const handleReset = () => {
        x = x.map((row) => row.map((i) => undefined));
    };
</script>

{#each x as y, k}
    <div class="row">
        {#each y as i, j}
            <div on:click={() => handleClick(k, j)} class="cell">
                {i ? i : ""}
            </div>
        {/each}
    </div>
{/each}

<button
    on:click={() => {
        handleReset();
    }}
>
    reset
</button>

{#if gameOver} GAME IS OVER {/if}

<style>
    .row {
        display: flex;
    }

    .cell {
        user-select: none;
        border: 1px solid black;
        width: 20px;
        height: 20px;
        text-align: center;
        padding-bottom: 2px;
    }
</style>
