<script>
    import { goto } from '$app/navigation';
  import { onDestroy } from 'svelte';
    import { records, user } from '../stores.js';
    const imageURL = "https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png";

    let authToken = localStorage.getItem("vattend-token");

    const toggleNav = () => {
        const nav = document.querySelector(".mobile-menu");
        nav.classList.toggle("hidden");
    }
    const handleSignOut = () => {
        localStorage.removeItem("vattend-token");
        goto("/login")
        document.querySelector("#logout").classList.add("hidden");
        document.querySelector("#login").classList.remove("hidden");
        records.set([]);
        user.set({
            name: "N/A",
            employeeId: "N/A",
            dateAdded: "N/A",
            timeAdded: "N/A",
            admin: false,
            present: false,
            loggedIn: false,
        });
    }
    let userContent
    const unsubscribe = user.subscribe(value => {
        userContent = value
    })
    onDestroy(unsubscribe);
</script>

<nav class="bg-white shadow-lg">
    <div class="max-w-6xl mx-auto px-4">
        <div class="flex justify-between">
            <div class="flex space-x-7">
                <div>
                    <!-- Website Logo -->
                    <a href="/" class="flex items-center py-4 px-2">
                        <img src={imageURL} alt="Logo" class="h-8 w-8 mr-2">
                        <span class="font-semibold text-gray-500 text-lg">VAttend</span>
                    </a>
                </div>
                <!-- Primary Navbar items -->
                <div class="hidden md:flex items-center space-x-1">
                    <a href="/" class="py-4 px-2 text-green-500 border-b-4 border-green-500 font-semibold ">Home</a>
                    <a href="/profile" class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Profile</a>
                    <a href="/admin" class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Admin</a>
                    <a href="/about" class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">About</a>
                </div>
            </div>
            <!-- Secondary Navbar items -->
            <div class="hidden md:flex items-center space-x-3 ">
                <a id="login" href="/login" class={`${!userContent.loggedIn?"block":"hidden"} py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300`}>Log In</a>
                <button id="logout" on:click={handleSignOut} class={`${userContent.loggedIn?"block":"hidden"} py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300`}>Log Out</button>
            </div>
            <!-- Mobile menu button -->
            <div class="md:hidden flex items-center">
                <button class="outline-none mobile-menu-button">
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <svg class=" w-6 h-6 text-gray-500 hover:text-green-500 "
                    on:click={toggleNav}
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
            </div>
        </div>
    </div>
    <!-- mobile menu -->
    <div class="hidden mobile-menu">
        <ul class="">
            <li class="active"><a href="/" class="block text-sm px-2 py-4 text-white bg-green-500 font-semibold">Home</a></li>
            <li><a href="/profile" class="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Profile</a></li>
            <li><a href="/admin" class="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Admin</a></li>
            <li><a href="/about" class="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">About</a></li>
            <li class="p-2">
                <a id="login" href="/login" class={`${(authToken == null)?"block":"hidden"} py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300`}>Log In</a>
            </li>
            <li class="p-2">
                <button id="logout" on:click={handleSignOut} class={`${(authToken != null)?"block":"hidden"} py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300`}>Log Out</button>
            </li>
        </ul>
    </div>
</nav>