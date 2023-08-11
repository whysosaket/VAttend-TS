<script>
    import {goto} from '$app/navigation'
    import { onDestroy } from 'svelte';
    import {user} from '../../../stores.js'
  import AllEmployess from '../../../components/Admin/AllEmployess.svelte';

    let userContent
    const unsubscribe = user.subscribe(value => {
        userContent = value
    })

    onDestroy(unsubscribe)

    if(!localStorage.getItem('vattend-token')){
        goto('/login')
    } else if((userContent.loggedIn==false)||(userContent.admin==false||userContent.admin==undefined)){
        goto('/profile')
    }
</script>

<svelte:head>
	<title>Dashboard - VAttend</title>
	<meta name="robots" content="noindex nofollow" />
	<html lang="en" />
</svelte:head>

<div>
    <div class="flex justify-center">
        <div class="my-8 w-5/6 md:w-full">
            <h1 class="text-center font-bold text-3xl text-gray-700">All <span class="text-green-500">Employees</span></h1>
            <AllEmployess />
        </div>
    </div>
</div>