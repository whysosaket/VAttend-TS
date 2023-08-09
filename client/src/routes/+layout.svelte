<script>
  import Navbar from "../components/Navbar.svelte";
  import "../app.css";
  import { onMount } from "svelte";
  let loaded = false;
  onMount(() => {
    loaded = true;
  });
</script>

{#if loaded}
  <Navbar />
{/if}
<slot />
