<script>
  export let filename = '';
  export let caption = '';
  export let isCaptionOnRight = false;
  export let isCustomCaption = false;
</script>

<style>
  img {
    max-width: 80%;
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
</style>

<figure class="{ isCaptionOnRight ? 'caption-right' : '' }">
  <img src="{ './photo/' + filename }" alt={caption}/>
  <figcaption>
    {#if isCustomCaption}
      <slot></slot>
    {:else}
      {caption}
    {/if}
  </figcaption>
</figure>
