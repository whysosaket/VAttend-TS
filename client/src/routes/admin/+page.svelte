<script>
  import { blur } from "svelte/transition";
  import { goto } from "$app/navigation";
  import TabItem from "../../components/Admin/TabItem.svelte";
  const HOST = import.meta.env.VITE_HOST;
  import { user } from "../../stores.js";
  import { onDestroy } from "svelte";

  let userContent;
  const unsubscribe = user.subscribe((value) => {
    userContent = value;
  });
  onDestroy(unsubscribe);

  const getProfile = async () => {
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
      user.set({
        name: details.name,
        employeeId: details.employee_id,
        dateAdded: details.date,
        timeAdded: details.time,
        admin: details.admin,
        present: details.present,
        loggedIn: true,
      });
      if (!details.admin) {
        goto("/");
      }
    } else {
      return {};
    }
  };

  if (!localStorage.getItem("vattend-token")) {
    goto("/login");
  } else {
    if (
      userContent.loggedIn &&
      (userContent.admin == false || userContent.admin == undefined)
    ) {
      goto("/profile");
    } else if (
      userContent.loggedIn == false ||
      userContent.name == "N/A" ||
      userContent.employeeId == undefined
    ) {
      getProfile();
    }
  }

  let data = [
    {
      title: "Access Dashboard",
      description:
        "Access the admin dashboard, to view all employees, add/delete them, and view their profile.",
      button: "View Dashboard",
      link: "/admin/dashboard",
    },
    {
      title: "Add New Employee",
      description: "Add a new employee to the database.",
      button: "Add Employee",
      link: "/admin/add",
    },
  ];
</script>

<svelte:head>
	<title>Admin - VAttend</title>
	<meta name="robots" content="noindex nofollow" />
	<html lang="en" />
</svelte:head>

<div in:blur={{ duration: 500 }}>
  <h1 class="text-center my-8 font-bold text-3xl text-gray-700">
    Admin <span class="text-green-500">Panel</span>
  </h1>
  <div class="">
    {#each data as d}
      <TabItem
        title={d.title}
        description={d.description}
        button={d.button}
        link={d.link}
      />
    {/each}
  </div>
</div>
