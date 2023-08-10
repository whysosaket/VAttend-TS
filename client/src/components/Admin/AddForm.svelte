<script>
  const HOST = import.meta.env.VITE_HOST;
  const handleSubmit = async () => {
    const employeeId = document.getElementById("eid").value;
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    const admin = document.getElementById("admin").value;

    if(!employeeId || !name || !password || !admin){
      alert("Please fill all the fields");
      return;
    }

    const response = await fetch(`${HOST}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Bypass-Tunnel-Reminder": "anything",
        "auth-token": localStorage.getItem('vattend-token')
      },
      body: JSON.stringify({ name: name, employee_id: employeeId, password: password, admin: (admin === "Yes")?true:false })
    });
    const json = await response.json();
    
    if(json.success){
        alert("User added successfully");
        document.getElementById("eid").value = "";
        document.getElementById("name").value = "";
        document.getElementById("password").value = "";
        document.getElementById("admin").value = "";
    }
    else {
        alert(json.error);
      }
  };
</script>

<div in:blur={{ duration: 500 }}>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-16 w-auto"
        src="/logo.png"
        alt="Your Company"
      />
      <h2
        class="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Add a new employee
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="space-y-3">
        <div>
          <label
            for="eid"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Employee Id</label
          >
          <div class="mt-1">
            <input
              id="eid"
              name="eid"
              type="text"
              class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label
            for="name"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Name</label
          >
          <div class="mt-1">
            <input
              id="name"
              name="eid"
              type="name"
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
          </div>
          <div class="mt-1">
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

        <div class="mt-1">
          <label
            for="admin"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Admin</label
          >
          <select
            name="admin"
            id="admin"
            class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
          >
            <option>NO</option>
            <option>Yes</option>
          </select>
        </div>
      </div>

      <div class="mt-6">
        <button
          on:click={handleSubmit}
          class="flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
          >Create Account</button
        >
      </div>
    </div>
  </div>
</div>
