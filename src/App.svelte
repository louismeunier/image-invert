<script lang="ts">
  import { downloadImages } from "./util";
  // :)
  let files: FileList | null = null;
  import icon from "./invert.png"
  import implies from "./implies.png"

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

    display: flex;
    flex-direction: column;
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
</style>
