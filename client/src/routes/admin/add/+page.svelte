<script>
    import {goto} from '$app/navigation'
    import { onDestroy } from 'svelte';
    import {user} from '../../../stores.js'
  import AddForm from '../../../components/Admin/AddForm.svelte';

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
	<title>Add Employee - VAttend</title>
	<meta name="robots" content="noindex nofollow" />
	<html lang="en" />
</svelte:head>

<div>
    <AddForm />
</div>