<script>
    import { blur } from "svelte/transition";
    import {goto} from '$app/navigation';

    if(!localStorage.getItem('vattend-token')){
        goto('/');
    }
</script>

<div in:blur="{{duration: 500}}">
This is admin
</div>