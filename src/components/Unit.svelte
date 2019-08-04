<script>
  import { createEventDispatcher } from 'svelte';

  export let hasNext = true;
  export let hasPrev = true;


  const dispatch = createEventDispatcher();

  function onNext() {
    dispatch('next');
  }

  function onPrev() {
    dispatch('prev');
  }
</script>

<style>
  .navigation {
    width: 100%;
    margin-top: 90px;
    height: 40px;
  }

  .nav-button {
    display: inline-block;
    font-family: GOSTUI, sans-serif;
    font-size: 13px;
    cursor: pointer;
    padding: 4px 10px;
    border: 1px solid gray;
    border-radius: 1px;
  }

  .nav-button:last-child {
    float: right;
  }

  .nav-button:hover {
    background-color: #f0f0f0;
  }
</style>

<div style="padding-bottom: 20px;">
    <slot>
        <!-- Fallback in case no content was provided -->
        <h3>Oops!</h3>
    </slot>

    <div class="navigation">
        <div class="nav-button { hasPrev ? '' : 'invisible' }"
            on:click={onPrev}>
            НАЗАД
        </div>
        <div class="nav-button { hasNext ? '' : 'invisible' }"
            on:click={onNext}>
            ДАЛЕЕ
        </div>
    </div>
</div>
