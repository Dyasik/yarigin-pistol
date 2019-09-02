<script>
  import { onMount, onDestroy } from 'svelte';

  import Header from './Header.svelte';
  import Sidebar from './Sidebar.svelte';
  import Content from './Content.svelte';
  import Video from './Video.svelte';
  import Intro from './Intro.svelte';

  import structure from '../structure';

  let activeTab;
  let activeUnit;
  let activeSubUnit;
  let showIntro = true;
  let showUp = false;


  function activateTab(tab) {
    activeTab = tab;
    activateUnit(activeTab.units[0]);
  }

  function activateUnit(unit, skipSubUnitSelection = false) {
    if (activeUnit === unit) {
      return;
    }

    scrollToTop();

    activeUnit = unit;

    if (!skipSubUnitSelection) {
      activateSubUnit(activeUnit.subUnits && activeUnit.subUnits[0]);
    }
  }

  function activateSubUnit(subUnit) {
    if (!subUnit) {
      activeSubUnit = subUnit;
      return;
    }

    if (activeSubUnit === subUnit) {
      return;
    }

    // Array.find and Array.includes are not present in IE, so going for some boilerplate
    let unit = activeTab.units[0];
    for (const u of activeTab.units) {
      if (!u.subUnits) {
        continue;
      }

      const subUnitIndex = u.subUnits.indexOf(subUnit);

      if (subUnitIndex === -1) {
        continue;
      }

      unit = u;
      break;
    }

    activateUnit(unit, true);

    scrollToTop();

    activeSubUnit = subUnit;
  }

  function checkShowUp() {
    showUp = document.documentElement.scrollTop >= 350;
  }

  onMount(function() {
    window.addEventListener('scroll', checkShowUp);
  });

  onDestroy(function() {
    window.removeEventListener('scroll', checkShowUp);
  });

  function scrollToTop() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  activateTab(structure[0]);
</script>

<style>
    .content {
        width: 100%;
        padding-top: 15px;
        background: url("./banners/pattern.jpg") repeat;
    }

    .up-wrap {
        position: fixed;
        width: 100vw;
        left: 0;
        bottom: 70px;
    }

    .up {
        width: 200px;
        height: 50px;
        border: 1px solid #efefef;
        background-color: #fff;
        border-radius: 2px;
        cursor: pointer;
    }

    .up:hover {
        background-color: #fafafa;
    }
</style>


{#if showIntro}
<Intro
    on:introEnd="{ e => showIntro = false }"
/>
{:else}

<Header
    tabs={structure}
    activeTab={activeTab}
    on:selectTab="{ e => activateTab(e.detail.tab) }"
/>

<div class="content">
    <div class="container d-flex">
        <Sidebar
            units={activeTab.units}
            activeUnit={activeUnit}
            activeSubUnit={activeSubUnit}
            on:selectUnit="{ e => activateUnit(e.detail.unit) }"
            on:selectSubUnit="{ e => activateSubUnit(e.detail.subUnit) }"
        />

        <Content
            structure={structure}
            activeTab={activeTab}
            activeUnit={activeUnit}
            activeSubUnit={activeSubUnit}
            on:selectUnit="{ e => activateUnit(e.detail.unit) }"
            on:selectSubUnit="{ e => activateSubUnit(e.detail.subUnit) }"
            on:selectTab="{ e => activateTab(e.detail.tab) }"
        />

        {#if showUp}
        <div class="up-wrap">
            <div class="container">
                <div class="up d-inline-flex justify-content-center align-items-center"
                     on:click={ scrollToTop }>
                    ВВЕРХ
                </div>
            </div>
        </div>
        {/if}
    </div>
</div>

{/if}
