<script>
  const HOST = import.meta.env.VITE_HOST;
  import { goto } from '$app/navigation';
  import ProfileLoadingSkeleton from './ProfileLoadingSkeleton.svelte';

  let user = {
    name: "N/A",
    employeeId: "N/A",
    imageURL:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    dateAdded: "N/A",
    timeAdded: "N/A",
    admin: false,
    present: false,
  };

  let loaded = false;

  const getProfile = async () => {
    loaded = false;
    const response = await fetch(`${HOST}/api/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Bypass-Tunnel-Reminder": "anything",
        "auth-token": localStorage.getItem("vattend-token"),
      },
    });

    const json = await response.json();
    if (json.success) {
      let details = json.details;
      user.name = details.name;
      user.employeeId = details.employee_id;
      user.dateAdded = details.date;
      user.timeAdded = details.time;
      user.admin = details.admin;
      user.present = details.present;
      loaded = true;
    } else {
      return {};
    }
  };

  if(!localStorage.getItem('vattend-token')){
    goto('/');
  } else {
    getProfile();
  }

  
</script>


<div class="flex justify-center m-8">
  {#if loaded}
  <div class="md:flex bg-slate-50 w-full p-4">
    <div class="text-center">
      <img
        class="mx-auto w-32"
        src={`https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png`}
        alt="profilePhoto"
      />
      <h1 class="font-semibold text-lg">{user.name}</h1>
      <h1 class="font-semibold text-sm text-green-500">{user.employeeId}</h1>
    </div>
    <div class="text-left mx-4 text-green-500 font-semibold text-lg">
      <h1 class="">
        Date Added: <span class="text-gray-600 text-sm">{user.dateAdded}</span>
      </h1>
      <h1 class="">
        Time Added: <span class="text-gray-600 text-sm">{user.timeAdded}</span>
      </h1>
      <h1 class="">
        Admin: <span class="text-gray-600 text-sm"
          >{user.admin ? "Yes" : "No"}</span
        >
      </h1>
      <h1 class="">
        Today: <span class="text-gray-600 text-sm"
          >{user.present ? "Present" : "Absent"}</span
        >
      </h1>
    </div>
  </div>
  {:else}
  <ProfileLoadingSkeleton />
  {/if}
</div>
