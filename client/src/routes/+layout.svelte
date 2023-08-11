<script>
  import Navbar from "../components/Navbar.svelte";
  import "../app.css";
  import { onMount } from "svelte";
  import Loader from "../components/Loader.svelte";
  import ProgressBar from 'svelte-progress-bar'
  import {progress} from '../stores.js'

  const HOST = import.meta.env.VITE_HOST;
  import { goto } from '$app/navigation';
  import {user} from '../stores.js';
  import { onDestroy } from 'svelte';

  let userContent
  const unsubscribe = user.subscribe(value => {
    userContent = value
  })

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
      user.set({
        name: details.name,
        employeeId: details.employee_id,
        dateAdded: details.date,
        timeAdded: details.time,
        admin: details.admin,
        present: details.present,
        loggedIn: true,
      });
      loaded = true;
    } else {
      return {};
    }
  };

  
  onDestroy(unsubscribe);
  let loaded = false;
  onMount(() => {
    if(!localStorage.getItem('vattend-token')){
      goto('/');
      loaded = true;
    } else {
      if((userContent.loggedIn==false)||(userContent.name=="N/A"||userContent.name==undefined)){
        getProfile();
      }else{
        loaded = true;
      }
    }
  });
  // let progress
  let progressBar
  progress.subscribe(value => {
    progressBar = value
  })
</script>

{#if loaded}
  <ProgressBar width={progressBar} color="#22c55e"  />
  <Navbar />
  <slot />
{:else}
  <Loader />
{/if}

