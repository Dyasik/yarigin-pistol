<script>
    import { createEventDispatcher } from 'svelte';

    export let tabs = [];
    export let activeTab = {};

    const dispatch = createEventDispatcher();

    function selectTab(tab) {
      dispatch('selectTab', {
        tab,
      });
    }

    function handleKeydown(event, tab) {
      if (event.which === 13) {
        selectTab(tab);
      }
    }
</script>

<style>
    nav {
        background-color: #000;
        color: #fff;
        font-family: GOSTUI-Medium, sans-serif;
        font-size: 14px;
    }

    .super-header {
        height: 40px;
        font-size: 20px;
        text-align: center;
    }

    .tab {
        height: 50px;
        flex-basis: 25%;
        padding: 0 6px;
        cursor: pointer;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .tab:focus,
    .tab:active,
    .tab:hover {
        outline: none;
        background-color: #222;
    }

    .tab.tab-active::after {
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background-color: #eb0029;
    }
</style>

<nav>
    <div class="super-header">ПИСТОЛЕТ ЯРЫГИНА ПЯ</div>
    <div class="container d-flex align-items-center-1">
    {#each tabs as tab (tab.title)}
        <span class="tab { tab.title === activeTab.title ? 'tab-active' : '' }"
            tabindex="0"
            on:click="{ e => selectTab(tab) }"
            on:keydown="{ e => handleKeydown(e, tab) }">
            { tab.title }
        </span>
    {/each}
    </div>
</nav>
