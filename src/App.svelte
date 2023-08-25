<script lang="ts">
  import { downloadImages, drawImages } from "./util";
  // :)
  let files: FileList | null = null;
  import icon from "./invert.png"
  import implies from "./implies.png"

  let preserveAlpha = true;


  $: if (files != null) {
    // clear();
    drawImages(files, preserveAlpha);
  }


  function clear() {
    files = null;
    // delete all canvas elements
    const canvases = document.querySelectorAll("canvas");
    canvases.forEach((canvas) => canvas.remove());
  }

</script>

<main>
<div class="upload">
  <div>
    <h1>Image Inverter</h1>
  </div>
  <div class="icons">
    <img height="50px" src={icon}>
    <img height="20px" src={implies}>
    <img height="50px" class="inverted" src={icon}>
  </div>
  <div>
    <button>
      <label for="many">Upload images</label>
    </button>
    <input bind:files id="many" multiple type="file" on:click="{clear}" />
      <input type="checkbox" bind:checked={preserveAlpha}
      on:change={()=>drawImages(files, preserveAlpha)}
      >
      Preserve alpha
    <!-- clear button -->
    <button 
      disabled={files == null}
      on:click={clear}>
      Clear
    </button>
    <button 
      disabled={files == null}
      on:click={downloadImages}>
      Download
    </button>
  </div>
  <div>
      <p>{files != null ? files.length : 0} files selected</p>
  </div>
</div>
<button id="fake-download">abcde</button>
<!-- display the images uploaded -->
<div class="image-container">
<!-- {#if files}
  {#each Array.from(files) as file, i}
    <canvas id={"file-" + i}/>
  {/each}
{/if} -->
</div>
<p id="disclaimer">* nb: does not currently work on mobile</p>
</main>

<style>

  input[type="file"] {
    display: none;
  }
  main {
    /* display: flex; */
    width: 100vw;
    height: 100vh;
    /* overflow-y: hidden; */
    /* flex-direction: column; */
  }

  .upload {
    padding: 1rem;
    text-align: center;
    position: fixed;
    z-index: 99;
    /* width: 100vw; */
    background-color: rgb(211, 211, 211, 0.9);
    display: flex;
    flex-direction: column;
    border-radius: 0 0 5rem 0;
  }

  .image-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100vw;
  }

  canvas {
    object-fit: none;
    object-position: top left;
  }
  .inverted {
    filter: invert(1);
  }
  #fake-download {
    display: none;
  }

  button {
    height: 2rem;
    margin: 0 0.5rem;
  }

  .icons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.1rem;
    gap: 1.5rem;
  }

  #disclaimer {
    font-size: 0.8rem;
    position: fixed;
    bottom: 0;
    text-align: center;
    width: 100vw;
    color: red;
    margin-bottom: 0.1em;
    font-style: italic;
  }

  h1 {
    font-size: 1.5rem;
  }
</style>
