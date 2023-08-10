<script>
  import {blur} from "svelte/transition";
  import { goto } from "$app/navigation";
  import { progress, user } from "../../stores.js";
  function updateBar(value) {
    progress.set(value);
  }
  async function handleSubmit() {
    updateBar(0.1);
    const eid = document.getElementById("eid").value;
    const password = document.getElementById("password").value;
    updateBar(0.3);
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eid,
        password,
      }),
    });
    updateBar(0.6);
    const data = await response.json();
    updateBar(0.8);
    if (data.success) {
      localStorage.setItem("vattend-token", data.authtoken);
      if (!localStorage.getItem("vadevicetoken")) {
        localStorage.setItem("vadevicetoken", data.devicetoken);
      }
      user.set({...user, loggedIn: true});
      updateBar(1);
      goto("/");
      setTimeout(() => {
        progress.set(0);
      }, 100);
    } else {
      updateBar(0);
      alert(data.error);
    }
  }
</script>

<svelte:head>
	<title>Login - VAttend</title>
	<meta name="robots" content="noindex nofollow" />
	<html lang="en" />
</svelte:head>

<div in:blur="{{duration: 500}}">
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=green&shade=600"
        alt="Your Company"
      />
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Log in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6">
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Employee Id</label
          >
          <div class="mt-2">
            <input
              id="eid"
              name="eid"
              type="text"
              class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >
            <div class="text-sm">
              <a
                href="/forget"
                class="font-semibold text-green-500 hover:text-green-600"
                >Forgot password?</a
              >
            </div>
          </div>
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            on:click={handleSubmit}
            class="flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
            >Sign in</button
          >
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Not a member?
        <a
          href="/trial"
          class="font-semibold leading-6 text-green-500 hover:text-green-700"
          >Start a 14 day free trial</a
        >
      </p>
    </div>
  </div>
</div>
