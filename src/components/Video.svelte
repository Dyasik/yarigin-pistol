<script>
  import { onMount } from 'svelte';

  export let filename = '';
  export let caption = '';
  export let isCaptionCustom = false;
  export let showCaption = true;
  export let controls = true;
  export let autoplay = false;
  export let endCallback;

  const videosDir = 'video';

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
        <source src={`./${videosDir}/${filename}.mp4`} type='video/mp4'>
        <source src={`./${videosDir}/${filename}.webm`} type='video/webm; codecs="vp8, vorbis"'>
        <source src={`./${videosDir}/${filename}.ogg`} type='video/ogg; codecs="theora, vorbis"'>
    </video>
    {#if showCaption}
    <figcaption>
        {#if isCaptionCustom}
            <slot></slot>
        {:else}
            {caption}
        {/if}
        <br/>
        <div class="disclaimer">
            Если видео не воспроизводится в браузере, его можно найти в папке {videosDir} с названием "{filename}".
        </div>
    </figcaption>
    {/if}
</figure>
