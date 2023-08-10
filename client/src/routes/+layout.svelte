<script>
  import Navbar from "../components/Navbar.svelte";
  import "../app.css";
  import { onMount } from "svelte";
  import Loader from "../components/Loader.svelte";
  let loaded = false;
  onMount(() => {
    loaded = true;
  });
</script>

{#if loaded}
  <Navbar />
  <slot />
{:else}
  <Loader />
{/if}

