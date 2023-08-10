<script>
    export let ButtonValue;
    export let uri;
    let message = "";

    const HOST = import.meta.env.VITE_HOST;

    const handleMarkAttendance = async ()=>{
        const authToken = localStorage.getItem("vattend-token");
        const deviceToken = localStorage.getItem("vadevicetoken");

        if(!authToken){
            alert("Please Login First");
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

            if(json.success){
                message = "";
                if(json.present) alert("Attendance Marked Successfully!");
                else alert("Attendance Recorded, Not Marked!");
            }else{
                message = json.error;
            }
        }}else{
            message="Sorry! Device/Browser doesn't support Geolocation/Permission denied!";
        }
        



    }
</script>

<div class="flex flex-col justify-center">
<button on:click={handleMarkAttendance} class="mx-auto py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300">{ButtonValue}</button>
<h1 class="text-center my-4 font-semibold">{message}</h1>
</div>
