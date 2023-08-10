<script>
	  import { fly, blur } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
</script>

<div out:blur="{{duration: 500}}" class="flex items-center justify-center w-full h-screen z-50">
  <div
    class="flex justify-center items-center m-auto space-x-1 text-sm text-gray-700"
  >
    <svg
      fill="none"
      class="w-10 h-10 animate-spin my-auto"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clip-rule="evenodd"
        d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
        fill="currentColor"
        fill-rule="evenodd"
      />
    </svg>
    <div class="text-2xl font-light"><span id="spin"></span></div>
  </div>
</div>

<style>
#spin:after {
  content:"Loading...";
  animation: spin 15s linear infinite;
}
@keyframes spin {
  0% { content:"Loading...";}
  20% { content: "VAttend..."; }
  40% { content: "Loading..."; }
  60% { content: "VAttend..."; }
  80% { content: "Something Seems to be Wrong!"; }
}
</style>
