<script>
    import {goto} from '$app/navigation'
     // check if image is loaded
    function imageLoaded() {
        const img = document.querySelector('img');
        img.classList.add('loaded');
    }
    // check if image is broken    
</script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" />

<div class="flex justify-center my-8">
    <div>
        <div class="text-center">
           
            <div class="mb-2 mx-auto bg-gray-200 border border-gray-200 rounded-full h-32 w-32 animate-pulse-custom">
                 <img src="./saket.jpeg" class="rounded-full mx-auto" alt="profilephoto">
            </div>
            <h1 class="text-4xl text-green-500 font-bold my-2">Saket Aryan</h1>
            <h1 class="font-semibold text-sm">Hey! This is me Saket. I'm a professional and passionate code copier.</h1>
            <button on:click={()=> goto("https://saketaryan.netlify.app/")} class="text-white mt-10 py-2 px-4 uppercase rounded bg-green-500 hover:bg-green-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                Visit My Portfolio
            </button>
        </div>

        <div class="my-4 text-center">
            <h4 class="mt-32 md:mt-36 font-bold">Connect With Me</h4>
            <a href="https://www.linkedin.com/in/saketaryan/"><i class="text-[#0077B5] mx-1 fa-brands fa-linkedin fa-2x"></i></a>
            <a href="https://github.com/whysosaket/"><i class="text-[#171515] mx-1 fa-brands fa-github fa-2x"></i></a>
            <a href="https://www.instagram.com/saketaryann/"><i class="text-[#E12D6C] mx-1 fa-brands fa-instagram fa-2x"></i></a>
            <a href="https://twitter.com/whysosaket"><i class="text-[#1DA1F2] mx-1 fa-brands fa-twitter fa-2x"></i></a>
            <a href="https://www.facebook.com/saket.aryan"><i class="text-[#4267B2] mx-1 fa-brands fa-facebook fa-2x"></i></a>
        </div>
        
    </div>
</div>