<script>
  import AttendanceModal from "./Attendance/AttendanceModal.svelte";
  import ErrorModal from "./Modals/ErrorModal.svelte";

    export let ButtonValue;
    export let uri;
    let message = "";

    const HOST = import.meta.env.VITE_HOST;

    let isModalOpen = false;
    let isErrorModalOpen = false;

    let name = ""
    let employeeId = ""
    let time = ""
    let date = ""
    let distance = ""
    let present = false

    const handleMarkAttendance = async ()=>{
        const authToken = localStorage.getItem("vattend-token");

        if(!authToken){
            message = "Please Login First";
            isErrorModalOpen = false;
            isErrorModalOpen = true;
            return;
        }
        const id = uri.split("/")[5];
        const url = `${HOST}/api/scan/${id}`;

        if (navigator.geolocation) {
        message = "Waiting...";
        navigator.geolocation.getCurrentPosition(sendRequest);
        console.log("Scanning...");
        setTimeout(() => {
            if(message==="Waiting..."){
                message="Sorry! Device/Browser doesn't support Geolocation/Permission denied!";
            }
        }, 10000);

        async function sendRequest(position){
            let latitude =  await position.coords.latitude;
            let longitude = await position.coords.longitude;

            let location = [latitude, longitude];

            const response = await fetch(url, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "auth-token": localStorage.getItem('vattend-token'),
                  "device-token": localStorage.getItem('vadevicetoken')
                },
                body: JSON.stringify({ location: location })
              });
          
            const json = await response.json();
              console.log(json);
            if(json.success){
                message = "";
                name = json.name;
                employeeId = json.employee_id;
                time = json.time;
                date = json.date;
                distance = json.distance;
                present = json.present;
                isModalOpen = false;
                isModalOpen = true;
            }else{
                message = json.error;
                isErrorModalOpen = false;
                isErrorModalOpen = true;
            }
        }}else{
            message="Sorry! Device/Browser doesn't support Geolocation/Permission denied!";
        }
    }
</script>

<div class="flex flex-col justify-center">
{#if isErrorModalOpen}
<ErrorModal isModalOpen={isErrorModalOpen} message={message} />
{/if}
{#if isModalOpen}
<AttendanceModal isModalOpen={isModalOpen} name={name} distance={distance} employeeId={employeeId} time={time} date={date} present={present}/>
{/if}
<button on:click={handleMarkAttendance} class="mx-auto py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300">{ButtonValue}</button>
<h1 class="text-center my-4 font-semibold">{message}</h1>
</div>
