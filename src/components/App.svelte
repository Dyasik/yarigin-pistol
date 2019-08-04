<script>
  import Header from './Header.svelte';
  import Sidebar from './Sidebar.svelte';
  import Content from './Content.svelte';

  import structure from '../structure';

  let activeTab;
  let activeUnit;
  let activeSubUnit;

  let contentDiv;

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

  function scrollToTop() {
    if (!contentDiv) {
      const _contentDivs = document.getElementsByClassName('content');

      if (!_contentDivs.length) {
        return;
      }

      contentDiv = _contentDivs[0];
    }

    contentDiv.scrollTop = 0;
  }

  activateTab(structure[0]);
</script>

<style>
    .content {
        width: 100%;
        height: calc(100% - 90px);
        position: fixed;
        top: 90px;
        padding-top: 15px;
        overflow: auto;
    }

    .main {
        padding: 0 4px;
        margin-left: 200px;
        text-align: justify;
    }
</style>

<Header
    tabs={structure}
    activeTab={activeTab}
    on:selectTab="{ e => activateTab(e.detail.tab) }"
/>

<div class="content">
    <div class="container d-flex" style="height: 100%;">
        <Sidebar
            units={activeTab.units}
            activeUnit={activeUnit}
            activeSubUnit={activeSubUnit}
            on:selectUnit="{ e => activateUnit(e.detail.unit) }"
            on:selectSubUnit="{ e => activateSubUnit(e.detail.subUnit) }"
        />

        <Content
            structure={structure}
            activeUnit={activeUnit}
            activeSubUnit={activeSubUnit}
            on:selectUnit="{ e => activateUnit(e.detail.unit) }"
            on:selectSubUnit="{ e => activateSubUnit(e.detail.subUnit) }"
            on:selectTab="{ e => activateTab(e.detail.tab) }"
        />
    </div>
</div>
