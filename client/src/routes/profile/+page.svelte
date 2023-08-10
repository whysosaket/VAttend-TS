<script>
  import { blur } from "svelte/transition";
  import Profile from "../../components/Profile/Profile.svelte";
  import Records from "../../components/Profile/Records.svelte";
</script>

<svelte:head>
	<title>Profile - VAttend</title>
	<meta name="robots" content="noindex nofollow" />
	<html lang="en" />
</svelte:head>

<div in:blur="{{duration: 500}}" class="flex justify-center">
    <div class="overflow-scroll">
        <Profile />
        <Records />
    </div>
</div>