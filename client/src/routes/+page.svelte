<script>
  import { onDestroy } from "svelte";
  const HOST = import.meta.env.VITE_HOST;
  import Qr from "../components/QR.svelte";
  import MarkAttendance from "../components/MarkAttendance.svelte";

  export let data;

  let qrCode = data.imageURL;
  let markAttendance = data.url;

  // Calculating time
  let seconds = new Date().getSeconds() * 1000;
  let waitingTime = seconds <= 30000 ? 30000 - seconds : 60000 - seconds;
  let refreshTime = 30000;

  let comInterval;
  setTimeout(() => {
    getQR();
    comInterval = setInterval(getQR, refreshTime); //This will refresh the data at regularIntervals of refreshTime
  }, waitingTime);

  const getQR = async () => {
    const response = await fetch(`${HOST}/api/QR`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Bypass-Tunnel-Reminder": "anything",
      },
    });

    const json = await response.json();
    if (json.success) {
      qrCode = await json.imgurl;
      markAttendance = await json.uri;
    } else {
      console.log(json.error);
      qrCode = "ERROR";
      markAttendance = "ERROR";
    }
  };

  onDestroy(() => {
    clearInterval(comInterval);
  });

  let isModalOpen = false;
</script>

<svelte:head>
	<title>Home - VAttend</title>
	<meta name="robots" content="noindex nofollow" />
	<html lang="en" />
</svelte:head>

<div in:blur="{{duration: 500}}">
{#if qrCode == "ERROR" || markAttendance == "ERROR"}
  <div class="flex justify-center h-screen">
    <div class="text-center m-auto">
      <img src="/error.svg" class="w-96 -mt-20" alt="error" />
      <h1 class="text-2xl text-green-600 my-10 uppercase font-semibold">Something went wrong</h1>
    </div>
  </div>
{:else}
<div class="flex justify-center">
  <div class="">
    <Qr QRLink={qrCode} />
    <h1 class="text-center my-4 font-semibold">Scan Code To Mark Attendance</h1>
    <MarkAttendance ButtonValue="Mark Attendance" uri={markAttendance} />
  </div>
</div>
{/if}
</div>

<style lang="postcss">
  :global(html) {
    background-color: #f3f4f6;
  }
</style>
