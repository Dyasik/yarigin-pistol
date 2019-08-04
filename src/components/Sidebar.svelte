<script>
    import { createEventDispatcher } from 'svelte';

    export let units = [];
    export let activeUnit = {};
    export let activeSubUnit = {};

    const dispatch = createEventDispatcher();

    function selectUnit(unit) {
      dispatch('selectUnit', {
        unit,
      });
    }

    function selectSubUnit(subUnit) {
      dispatch('selectSubUnit', {
        subUnit,
      });
    }

    function handleUnitKeydown(event, unit) {
      if (event.which === 13) {
        selectUnit(unit);
      }
    }

    function handleSubUnitKeydown(event, subUnit) {
      if (event.which === 13) {
        selectSubUnit(subUnit);
      }
    }
</script>

<style>
    .sidebar {
        position: fixed;
        width: 200px;
        min-width: 200px;
        font-family: GOSTUI, sans-serif;
        font-size: 14px;
    }

    .unit {
        margin: 4px 0;
    }

    .sub-unit {
        margin-left: 15px;
    }

    .unit, .sub-unit {
        cursor: pointer;
        padding: 2px;
    }

    .unit:focus,
    .unit:active,
    .unit:hover,
    .sub-unit:focus,
    .sub-unit:active,
    .sub-unit:hover {
        outline: none;
        font-family: GOSTUI-Medium, sans-serif;
    }

    .unit-active, .sub-unit-active {
        font-family: GOSTUI-Bold, sans-serif !important;
    }
</style>

<div class="sidebar">
    {#each units as unit (unit.title)}
        <div class="unit { unit === activeUnit ? 'unit-active' : '' }"
            on:click="{ e => selectUnit(unit) }"
            on:keydown="{ e => handleUnitKeydown(e, unit) }"
            tabindex="0">
            { unit.title }
        </div>
        {#if unit.subUnits }
            {#each unit.subUnits as subUnit (subUnit.title)}
                <div class="sub-unit { subUnit === activeSubUnit ? 'sub-unit-active' : '' }"
                    on:click="{ e => { selectUnit(unit); selectSubUnit(subUnit); } }"
                    on:keydown="{ e => { handleUnitKeydown(e, unit); handleSubUnitKeydown(e, subUnit); } }"
                    tabindex="0">
                    { subUnit.title }
                </div>
            {/each}
        {/if}
    {/each}
</div>
