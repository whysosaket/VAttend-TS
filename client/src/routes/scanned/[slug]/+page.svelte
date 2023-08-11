<script>
  import AttendanceModal from "../../../components/Attendance/AttendanceModal.svelte";
  import Loader from "../../../components/Loader.svelte";
  import ErrorModal from "../../../components/Modals/ErrorModal.svelte";

  export let data;

  let message = "";
  let loaded = false;

  const HOST = import.meta.env.VITE_HOST;

  let isModalOpen = false;
  let isErrorModalOpen = false;

  let name = "";
  let employeeId = "";
  let time = "";
  let date = "";
  let distance = "";
  let present = false;

  const handleMarkAttendance = async () => {
    const authToken = localStorage.getItem("vattend-token");

    if (!authToken) {
      alert("Please Login First");
      return;
    }
    const id = data.link;
    const url = `${HOST}/api/scan/${id}`;

    if (navigator.geolocation) {
      message = "Waiting...";
      navigator.geolocation.getCurrentPosition(sendRequest);
      setTimeout(() => {
        if (message === "Waiting...") {
          message =
            "Sorry! Device/Browser doesn't support Geolocation/Permission denied!";
        }
      }, 10000);

      async function sendRequest(position) {
        let latitude = await position.coords.latitude;
        let longitude = await position.coords.longitude;

        let location = [latitude, longitude];

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("vattend-token"),
            "device-token": localStorage.getItem("vadevicetoken"),
          },
          body: JSON.stringify({ location: location }),
        });
        const json = await response.json();
        loaded = true;
        if (json.success) {
          message = "";
          name = json.name;
          employeeId = json.employee_id;
          time = json.time;
          date = json.date;
          distance = json.distance;
          present = json.present;
          isModalOpen = false;
          isModalOpen = true;
        } else {
          message = json.error+" You will be redirected to the home page in 5 seconds.";
          isErrorModalOpen = false;
          isErrorModalOpen = true;
        }
      }
    } else {
      message =
        "Sorry! Device/Browser doesn't support Geolocation/Permission denied!";
    }
    setTimeout(() => {
    isErrorModalOpen = false;
    isModalOpen = false;
      goto("/");
    }, 5000);
  };

  if (!localStorage.getItem("vattend-token")) {
    goto("/login");
  } else {
    handleMarkAttendance();
  }

</script>

<div class="">
  {#if isErrorModalOpen}
    <ErrorModal isModalOpen={isErrorModalOpen} {message} />
  {/if}
  {#if isModalOpen}
    <AttendanceModal
      {isModalOpen}
      {name}
      {distance}
      {employeeId}
      {time}
      {date}
      {present}
      title={"You will be redirected to the home page in 5 seconds."}
    />
  {/if}
  {#if !loaded}
    <Loader />
  {/if}
</div>
