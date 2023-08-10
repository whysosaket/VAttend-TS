<script>
  import Profile from "../../components/Profile/Profile.svelte";
  import Records from "../../components/Profile/Records.svelte";
</script>

<svelte:head>
	<title>Profile - VAttend</title>
	<meta name="robots" content="noindex nofollow" />
	<html lang="en" />
</svelte:head>

<div class="flex justify-center">
    <div class="overflow-scroll">
        <Profile />
        <Records />
    </div>
</div>