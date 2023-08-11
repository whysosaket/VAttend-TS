<script>
    export let name
    export let employeeId
    export let time
    export let date
    export let distance
    export let present

    let spanStyle = "text-gray-300 font-light text-sm";
</script>

<div class="flex justify-center">
    <div class={`p-4 w-72 ${present?"bg-green-50":"bg-red-50"} dark:bg-gray-800 md:dark:bg-gray-700`}>
        <img src="/profile.webp" class="w-32 mx-auto" alt="profilepicture" />
        <div class="my-4 mx-8">
        <h1 class="font-semibold">Name: <span class={spanStyle}>{name}</span></h1>
        <h1 class="font-semibold">EmployeeId: <span class={spanStyle}>{employeeId}</span></h1>
        <h1 class="font-semibold">Time: <span class={spanStyle}>{time}</span></h1>
        <h1 class="font-semibold">Date: <span class={spanStyle}>{date}</span></h1>
        <h1 class="font-semibold">Distance: <span class={spanStyle}>{distance}</span></h1>
        </div>
        <div class="flex">
            <span class={`${present?"bg-green-500":"bg-red-500"} text-white px-4 py-2 mx-auto rounded-md select-none`}>{present?"Present":"Absent"}</span>
        </div>

    </div>
</div>