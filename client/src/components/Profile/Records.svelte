<script>
  import MapHandler from "./Map/MapHandler.svelte";
  import Record from "./Record.svelte";
  import RecordLoadingSkeletion from "./RecordLoadingSkeletion.svelte";
  const HOST = import.meta.env.VITE_HOST;
  import { records, user } from "../../stores.js";
  import { onDestroy } from "svelte";

  let recordsArray;
  const unsubscribe = records.subscribe((value) => {
    recordsArray = value;
  });

  let userContent;
  const unsubscribeUser = user.subscribe((value) => {
    userContent = value;
  });

  let isLoaded = false;

  const getRecords = async () => {
    const response = await fetch(`${HOST}/api/records/fetchallrecords`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Bypass-Tunnel-Reminder": "anything",
        "auth-token": localStorage.getItem("vattend-token"),
      },
    });

    const json = await response.json();
    if (json.success) {
      let tempArray = [];
      tempArray = json.records;
      tempArray = tempArray.reverse();
      records.set(tempArray);
      isLoaded = true;
    } else {
      return {};
    }
  };

  onDestroy(unsubscribe);
  onDestroy(unsubscribeUser);
  if (recordsArray.length === 0 && userContent.loggedIn) {
    getRecords();
  } else {
    isLoaded = true;
  }
</script>

<MapHandler records={recordsArray} />

<div class="relative overflow-x-scroll shadow-md sm:rounded-lg">
  <table class="w-4/5 md:w-full text-sm text-left text-gray-500">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
      <tr>
        <th scope="col" class="px-6 py-3"> Time </th>
        <th scope="col" class="px-6 py-3"> Date </th>
        <th scope="col" class="px-6 py-3"> Distance </th>
        <th scope="col" class="px-6 py-3"> Status </th>
      </tr>
    </thead>
    {#if isLoaded}
      <tbody>
        {#each recordsArray as record}
          <Record {record} />
        {/each}
      </tbody>
    {:else}
      <RecordLoadingSkeletion />
      <RecordLoadingSkeletion />
      <RecordLoadingSkeletion />
      <RecordLoadingSkeletion />
      <RecordLoadingSkeletion />
    {/if}
  </table>
</div>
