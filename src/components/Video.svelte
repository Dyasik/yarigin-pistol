<script>
  export let filename = '';
  export let caption = '';

  const videosDir = 'video';
  const source = `./${videosDir}/${filename}`;
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
        <source src={source}>
    </video>
    <figcaption>
        {caption}
        <br/>
        <div class="disclaimer">
            Если видео не воспроизводится в браузере, его можно найти в папке {videosDir} с названием "{filename}".
        </div>
    </figcaption>
</figure>
