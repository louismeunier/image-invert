<script lang="ts">
  import { downloadImages } from "./util";
  // :)
  let files: FileList | null = null;
 
</script>

<main>
<div class="upload">
  <div>
    <button>
      <label for="many">Upload images</label>
    </button>
    <input bind:files id="many" multiple type="file" />
    <!-- clear button -->
    <button 
      disabled={files == null}
      on:click={() => files = null}>
      Clear
    </button>
    <button 
      disabled={files == null}
      on:click={()=>downloadImages(files)}>
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
{#if files}
  {#each Array.from(files) as file}
    <img id="image" src={URL.createObjectURL(file)} />
  {/each}
{/if}
</div>

</main>

<style>

  input[type="file"] {
    display: none;
  }
  main {
    /* display: flex; */
    width: 100vw;
    /* flex-direction: column; */
  }

  .upload {
    padding: 1rem;
    text-align: center;
    position: static;
    z-index: 99;
    width: 100vw;
    background-color: rgb(211, 211, 211, 0.9);
  }

  .image-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    
  }

  .image-container img {
    /* fit to container */
    /* display: block; */
    filter: invert(1);
    height: 50vh;
  }

  #fake-download {
    display: none;
  }

  button {
    height: 2rem;
    margin: 0 0.5rem;
  }
</style>
