<script>
  import MapHandler from "./Map/MapHandler.svelte";
  import Record from "./Record.svelte";
  import RecordLoadingSkeletion from "./RecordLoadingSkeletion.svelte";
  const HOST = import.meta.env.VITE_HOST;

  let recordsArray = [];
  let isLoaded = false;

  const getRecords = async ()=>{

    const response = await fetch(`${HOST}/api/records/fetchallrecords`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Bypass-Tunnel-Reminder": "anything",
        'auth-token': localStorage.getItem('vattend-token')
      },
    });

    const json = await response.json();
    console.log(json);
    if(json.success){
        recordsArray = json.records;
        recordsArray = recordsArray.reverse();
        isLoaded = true;
    }else{
        return {};
    }
  }

  getRecords();

</script>

<MapHandler records={recordsArray}/>

<div class="relative overflow-x-scroll shadow-md sm:rounded-lg">
    <table class="w-4/5 md:w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Time
                </th>
                <th scope="col" class="px-6 py-3">
                    Date
                </th>
                <th scope="col" class="px-6 py-3">
                    Distance
                </th>
                <th scope="col" class="px-6 py-3">
                    Status
                </th>
            </tr>
        </thead>
        {#if isLoaded}
        <tbody>
            {#each recordsArray as record}
                <Record record={record} />
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