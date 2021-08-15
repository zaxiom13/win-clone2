<script>
    import { onMount } from "svelte";
    import { createEventDispatcher } from "svelte";

    let random = Math.random() * 400;
    let dispatch = createEventDispatcher();

    onMount(() => {
        dispatch("mounted", {
            maxWidth: 300,
            maxHeight: 300,
            minWidth: 300,
            minHeight: 300,
        });
    });
</script>

<menu role="tablist">
    <button aria-selected="true" aria-controls="music">Music</button>
    <button aria-controls="dogs">Dogs</button>
    <button aria-controls="food">Food</button>
</menu>
<article role="tabpanel" id="music">
    <p>Set your listening preferences</p>
    <fieldset>
        <legend>Today's mood</legend>
        <div class="field-row">
            <input
                id="radio29+{random}"
                type="radio"
                name="fieldset-example2"
            />
            <label for="radio29+{random}">Nicki Minaj</label>
        </div>
        <div class="field-row">
            <input
                id="radio30+{random}"
                type="radio"
                name="fieldset-example2"
            />
            <label for="radio30+{random}">Bell Towers</label>
        </div>
        <div class="field-row">
            <input
                id="radio31+{random}"
                type="radio"
                name="fieldset-example2"
            />
            <label for="radio31+{random}">The Glamorous Monique</label>
        </div>
        <div class="field-row">
            <input
                id="radio32+{random}"
                type="radio"
                name="fieldset-example2"
            />
            <label for="radio32">EN. V</label>
        </div>
    </fieldset>
    <section class="field-row">
        <button>Reset Alarm...</button>
        <label>Try this to get some attention</label>
    </section>
</article>

<article role="tabpanel" hidden id="dogs" />

<article role="tabpanel" hidden id="food" />
<section class="field-row" style="justify-content: flex-end">
    <button>OK</button>
    <button>Cancel</button>
</section>
