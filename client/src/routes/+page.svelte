<script>
  import Button from "../components/Button.svelte";
  import Qr from "../components/QR.svelte";

  export let data;

  // Calculating time
  let seconds = new Date().getSeconds() * 1000;
  let waitingTime = seconds <= 30000 ? 30000 - seconds : 60000 - seconds;
  let refreshTime = 30000;
  

</script>

<div class="flex justify-center">
  <div class="">
    <Qr QRLink={data.imageURL}/>
    <h1 class="text-center my-4 font-semibold">Scan Code To Mark Attendance</h1>
    <Button ButtonValue="Mark Attendance"/>
  </div>
</div>

<style lang="postcss">
    :global(html) {
      background-color: theme(colors.gray.100);
    }
</style>