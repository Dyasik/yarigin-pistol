<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    let videoRef;
    let started = false;

    function closeIntro() {
      dispatch('introEnd');
    }

    function play() {
      started = true;

      const playPromise = videoRef.play && videoRef.play();

      if (playPromise) {
        playPromise
          .then(e => console.log('Autoplay success'))
          .catch(e => console.log('Autoplay failed:', e));
      } else {
        console.log('play() returned nothing');
      }
    }
</script>

<style>
    .start {
        width: 220px;
        height: 220px;
        border-radius: 50%;
        font-family: SegoeUIBold, sans-serif;
        font-size: 24px;
        cursor: pointer;
        position: absolute;
        top: calc(50% - 110px);
        left: calc(50% - 110px);
        border: 1px solid gray;
        background-color: #FFF;
        z-index: 5;
    }

    .start:hover {
        background-color: #F5F5F5;
    }

    .intro {
        width: 100%;
        height: 100%;
        background-color: #FFF;
    }

    .intro .end-this {
        position: absolute;
        top: 15px;
        right: 15px;
        font-size: 14px;
        color: #333;
        padding: 5px 8px;
        border: 1px solid;
        cursor: pointer;
        z-index: 3;
    }

    .intro :global(video) {
        /* consider "end this" button */
        max-height: calc(100vh - 100px);
    }

    .intro :global(figure) {
        margin: 0;
    }
</style>

<div class="intro d-flex align-items-center justify-content-center">
    {#if !started}
        <div
            class="start d-flex align-items-center justify-content-center"
            on:click={play}
        >
            НАЧАТЬ
        </div>
    {/if}

    <div class="end-this { started ? '' : 'invisible' }" on:click={closeIntro}>
        Перейти к содержимому
    </div>

    <figure>
        <video
            src="./logo/intro.mp4"
            bind:this={videoRef}
            on:ended={closeIntro}
        ></video>
    </figure>
</div>
