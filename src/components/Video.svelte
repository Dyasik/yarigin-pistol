<script>
  export let filenames = [];
  export let caption = '';

  const videosDir = 'video';
  const sources = filenames.map(fn => `./${videosDir}/${fn}`);
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
    <video controls="controls">
        {#each sources as src}
            <source src={src}>
        {/each}
    </video>
    <figcaption>
        {caption}
        <br/>
        <div class="disclaimer">
            Если видео не воспроизводится в браузере, его можно найти в папке {videosDir} с названием "{filenames[0]}".
        </div>
    </figcaption>
</figure>
