<script>
    let activeTab = "Themes";

    const settings = {
        Themes: [
            { label: "Theme", value: "Windows XP", readonly: true },
            { label: "Color scheme", value: "Default (blue)", readonly: true },
            { label: "Font size", value: "Normal", readonly: true },
        ],
        Desktop: [
            { label: "Background", value: "None", readonly: true },
            { label: "Position", value: "Fit", readonly: true },
            { label: "Color", value: "Default (black)", readonly: true },
        ],
        ScreenSaver: [
            { label: "Screen saver", value: "None", readonly: true },
            { label: "Wait", value: "20 minutes", readonly: true },
            { label: "Password protected", value: "No", readonly: true },
        ],
        Appearance: [
            {
                label: "Buttons",
                value: "Windows XP style",
                readonly: true,
            },
            { label: "Color scheme", value: "Default (blue)", readonly: true },
            { label: "Font", value: "Arial", readonly: true },
        ],
    };

    function switchTab(tab) {
        activeTab = tab;
    }
</script>

<div class="display-settings">
    <div class="tab-bar">
        {#each Object.keys(settings) as tab}
            <div
                class="tab {activeTab === tab ? 'tab-active' : ''}"
                on:click={() => switchTab(tab)}
            >
                {tab}
            </div>
        {/each}
    </div>
    <div class="content">
        <div class="content-title">{activeTab}</div>
        <div class="content-body">
            <div class="content-left">
                {#each settings[activeTab] as setting}
                    <div class="content-label">{setting.label}</div>
                {/each}
            </div>
            <div class="content-right">
                {#each settings[activeTab] as setting}
                    <input
                        class="content-input"
                        type="text"
                        value={setting.value}
                        readonly={setting.readonly}
                    />
                {/each}
            </div>
        </div>
    </div>
</div>

<style>
    /* You can adjust the style here */
    .display-settings {
        background-color: #c0c0c0;
        border: 4px outset #808080;
        font-family: Arial, sans-serif;
        font-size: 10px;
    }

    .tab-bar {
        height: 24px;
        margin: 4px;
        background-color: #e0e0e0;
        border-bottom: 2px inset #808080;
        display: flex;
        align-items: center;
    }

    .tab {
        width: 80px;

        margin-left: 4px;
        background-color: #c0c0c0;
        border-top: 2px outset #808080;
        border-left: 2px outset #808080;
        border-right: 2px outset #808080;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
    }

    .tab:hover {
        border-style: inset;
    }

    .tab-active {
        background-color: white;
        border-bottom: none;
    }

    .content {
        height: 248px;
        margin: 4px;
        background-color: white;
        border-top: none;
        display: flex;
        flex-direction: column;
    }

    .content-title {
        height: 24px;
        margin-left: 4px;
        margin-top: 4px;
        background-color: white;
        color: blue;
        font-weight: bold;
        text-align: left;
    }

    .content-body {
        height: 200px;
        margin-left: 4px;
        margin-top: 4px;
        background-color: white;
        display: flex;
        flex-direction: row;
    }

    .content-left {
        width: 160px;
        background-color: white;
        display: flex;
        flex-direction: column;
    }

    .content-right {
        width: 224px;
        background-color: white;
        border-left: 2px inset #808080;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }

    .content-label {
        width: 152px;
        height: 20px;
        margin-left: 4px;
        margin-top: 4px;
        background-color: white;
        color: black;
        font-weight: normal;
        text-align: left;
        vertical-align: middle;
    }

    .content-input {
        width: 216px;
        height: 20px;
        margin-left: 4px;
        margin-top: 4px;
        background-color: white;
        color: black;
        font-weight: normal;
        text-align: left;
        vertical-align: middle;
        border: none;
    }
</style>
