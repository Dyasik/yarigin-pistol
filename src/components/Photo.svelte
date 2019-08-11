<script>
  export let filename = '';
  export let caption = '';
  export let isCaptionOnRight = false;
  export let isCustomCaption = false;
  export let maxWidth = '';
  export let maxHeight = '';

  let fullScreen = false;

  let imgStyle = '';

  if (maxWidth) {
    imgStyle += `max-width: ${maxWidth};`;
  }

  if (maxHeight) {
    imgStyle += `max-height: ${maxHeight};`;
  }

  function toggleFullscreen() {
    fullScreen = !fullScreen;
  }
</script>

<style>
  img {
    max-width: 80%;
    max-height: 90vh;
    cursor: pointer;
  }

  figure.caption-right {
    display: flex;
    align-items: center;
  }

  figure.caption-right figcaption {
    width: 180px;
    padding-left: 10px;
    text-align: left;
  }

  figure.caption-right img {
    width: calc(100% - 180px)
  }

  .fullscreen {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    background-color: rgba(0, 0, 0, .7);
    cursor: pointer;
  }

  .fullscreen__image {
    position: absolute;
    top: 10px;
    right: 40px;
    bottom: 10px;
    left: 40px;
    background: no-repeat center;
    background-size: contain;
  }
</style>

<figure class="{ isCaptionOnRight ? 'caption-right' : '' }">
  <img
    src="./photo/{filename}"
    alt={caption}
    on:click={ e => toggleFullscreen() }
    style={imgStyle}
  />

  {#if fullScreen}
  <div class="fullscreen"
       on:click={e => toggleFullscreen() }
  >
    <div class="fullscreen__image"
         style="background-image: url('./photo/{filename}');"
    >
    </div>
  </div>
  {/if}

  <figcaption>
    {#if isCustomCaption}
      <slot></slot>
    {:else}
      {caption}
    {/if}
  </figcaption>
</figure>
