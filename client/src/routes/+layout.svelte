<script>
  import Navbar from "../components/Navbar.svelte";
  import "../app.css";
  import { onMount } from "svelte";
  import Loader from "../components/Loader.svelte";
  import ProgressBar from 'svelte-progress-bar'
  import {progress} from '../stores.js'
  let loaded = false;
  onMount(() => {
    loaded = true;
  });
  // let progress
  let progressBar
  progress.subscribe(value => {
    progressBar = value
  })
</script>

{#if loaded}
  <ProgressBar width={progressBar} color="#22c55e"  />
  <Navbar />
  <slot />
{:else}
  <Loader />
{/if}

