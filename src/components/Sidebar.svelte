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
</script>

<style>
    .sidebar {
        width: 228px;
        min-width: 200px;
        font-family: "Segoe UI", SegoeUI, sans-serif;
        font-size: 14px;
        line-height: 19px;
    }

    .unit {
        margin-top: 60px;
        font-size: 16px;
        font-weight: bold;
    }

    .sub-unit {
        margin: 20px 0;
    }

    .unit, .sub-unit {
        cursor: pointer;
    }

    .unit-active, .sub-unit-active {
        color: #EF2045;
    }
</style>

<div class="sidebar">
    {#each units as unit (unit.title)}
        <div class="unit { (unit === activeUnit && (!activeSubUnit || !activeSubUnit.title)) ? 'unit-active' : '' }"
            on:click="{ e => selectUnit(unit) }">
            { unit.title }
        </div>
        {#if unit.subUnits }
            {#each unit.subUnits as subUnit (subUnit.title)}
                <div class="sub-unit { subUnit === activeSubUnit ? 'sub-unit-active' : '' }"
                    on:click="{ e => { selectUnit(unit); selectSubUnit(subUnit); } }">
                    { subUnit.title }
                </div>
            {/each}
        {/if}
    {/each}
</div>
