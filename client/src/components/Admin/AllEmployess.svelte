<script>
  import EmployeeLoadingSkeletion from "./EmployeeLoadingSkeletion.svelte";
  const HOST = import.meta.env.VITE_HOST;
  import { records, user } from "../../stores.js";
  import { onDestroy } from "svelte";
  import Employee from "./Employee.svelte";

  let recordsArray = [];

  let userContent;
  const unsubscribeUser = user.subscribe((value) => {
    userContent = value;
  });

  let isLoaded = false;

  const getRecords = async () => {
    const response = await fetch(`${HOST}/api/admin/fetchallusers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Bypass-Tunnel-Reminder": "anything",
        "auth-token": localStorage.getItem('vattend-token'),
      },
    });
    const json = await response.json();
    if (json.success) {
      recordsArray = json.users;
    recordsArray = recordsArray.reverse();
      isLoaded = true;
    } else {
      return {};
    }
  };

  onDestroy(unsubscribeUser);
  if (recordsArray.length === 0 && userContent.loggedIn) {
    getRecords();
  } else {
    isLoaded = true;
  }
</script>


<div class="relative overflow-x-scroll shadow-md sm:rounded-lg my-4">
    <table class="w-4/5 md:w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3"> Name </th>
          <th scope="col" class="px-6 py-3"> EmployeeId </th>
          <th scope="col" class="px-6 py-3"> Admin </th>
          <th scope="col" class="px-6 py-3"> Date Added </th>
        </tr>
      </thead>
      {#if isLoaded}
        <tbody>
          {#each recordsArray as record}
            <Employee record={record} />
          {/each}
        </tbody>
      {:else}
        <EmployeeLoadingSkeletion />
        <EmployeeLoadingSkeletion />
        <EmployeeLoadingSkeletion />
        <EmployeeLoadingSkeletion />
        <EmployeeLoadingSkeletion />
      {/if}
    </table>
  </div>