<script>
  import { onMount } from 'svelte';

  export let filename = '';
  export let caption = '';
  export let showCaption = true;
  export let controls = true;
  export let autoplay = false;
  export let endCallback;

  const videosDir = 'video';
  const source = `./${videosDir}/${filename}`;

  let videoRef;

  onMount(() => {
    if (autoplay) {
      const playPromise = videoRef.play && videoRef.play();

      if (playPromise) {
        playPromise
            .then(e => console.log('Autoplay success'))
            .catch(e => console.log('Autoplay failed:', e));
      } else {
        console.log('play() returned nothing');
      }
    }
  });
</script>

<style>
  video {
    max-width: 100%;
  }

  .disclaimer {
    font-size: 12px;
  }
</style>

<figure>
    <video
        bind:this={videoRef}
        controls="{ controls && 'controls' }"
        on:ended={endCallback ? endCallback : ()=>{}}
    >
        <source src={source}>
    </video>
    {#if showCaption}
    <figcaption>
        {caption}
        <br/>
        <div class="disclaimer">
            Если видео не воспроизводится в браузере, его можно найти в папке {videosDir} с названием "{filename}".
        </div>
    </figcaption>
    {/if}
</figure>
