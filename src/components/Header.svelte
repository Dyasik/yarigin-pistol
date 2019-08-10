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
</script>

<style>
    nav {
        background-color: #FFF;
        border-bottom: 2px solid #EBEBEB;;
    }

    .logo-1 {
        padding-bottom: 5px;
    }

    .logo-2 {
        margin: 0 20px 0 10px;
    }

    .tab {
        height: 80px;
        flex-basis: 20%;
        font-family: "Open Sans", sans-serif;
        font-weight: normal;
        font-size: 14px;
        line-height: 19px;
        text-transform: uppercase;
        padding: 0 10px;
        cursor: pointer;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .tab:hover {
        background-color: #F6F6F6;
    }

    .tab.tab-active {
        color: #EF2045;
    }

    .tab__name {
        flex-basis: 60%;
    }


    .banner {
        height: 400px;
        background-size: cover;
        background-position: center;
        color: #FFF;
        padding-bottom: 70px;
        display: flex;
        align-items: center;
    }

    .banner > .container {
        max-width: 60%;
    }

    .banner__title {
        font-family: "SegoeUIBold", sans-serif;
        font-size: 40px;
        line-height: 54px;
        text-transform: uppercase;
        margin-bottom: 30px;
    }

    .banner__body {
        font-family: "Segoe UI", SegoeUI, sans-serif;
        font-size: 16px;
        line-height: 21px;
    }
</style>

<nav>
    <div class="container d-flex align-items-center">
        <div class="d-flex">
            <img class="logo-1" src="./logo/logo-1.svg" alt=""/>
            <img class="logo-2" src="./logo/logo-2.svg" alt=""/>
        </div>

        {#each tabs as tab (tab.title)}
        <div class="tab { tab === activeTab ? 'tab-active' : '' }"
            on:click="{ e => selectTab(tab) }">
            <span class="tab__name">{ tab.title }</span>
        </div>
        {/each}
    </div>
</nav>

<div class="banner" style="background-image:url(./banners/{activeTab.banner.image});">
    <div class="container">
        <div class="banner__title">
            {@html activeTab.banner.title }
        </div>
        <div class="banner__body">
            { activeTab.banner.body }
        </div>
    </div>
</div>
