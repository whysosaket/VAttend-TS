<script>
  import Record from "./Record.svelte";
  const HOST = import.meta.env.VITE_HOST;

  let recordsArray = [];

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
    if(json.success){
        recordsArray = json.records;
        recordsArray = recordsArray.reverse();
    }else{
        return {};
    }
  }

  getRecords();

</script>

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
        <tbody>
            {#each recordsArray as record}
                <Record record={record} />
            {/each}
        </tbody>
    </table>
</div>