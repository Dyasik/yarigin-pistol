<script>
  export let filename = '';
  export let caption = '';
</script>

<style>
  img {
    max-width: 80%;
  }
</style>

<figure>
  <img src="{ './photo/' + filename }" alt={caption}/>
  <figcaption>{caption}</figcaption>
</figure>
