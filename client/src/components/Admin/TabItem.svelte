<script>
    import { goto } from '$app/navigation';
    export let title;
    export let description;
    export let button;
    export let link;
</script>


<div class="border my-2 p-2 mx-4 md:flex justify-between">
    <div class="">
        <h1 class="font-semibold">{title}</h1>
        <p class="font-light text-sm">{description}</p>
    </div>
    
    <button on:click={()=> goto(link)} class="text-white mt-5 md:mt-10 py-2 px-4 uppercase rounded bg-green-500 hover:bg-green-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
        {button}
    </button>
</div>