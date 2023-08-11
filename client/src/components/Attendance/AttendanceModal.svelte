<script>
    import { Button, Modal } from 'flowbite-svelte';
    import AttendanceCard from './AttendanceCard.svelte';

    export let isModalOpen = false;
    export let name = "";
    export let employeeId = "";
    export let time = "";
    export let date = "";
    export let present = true;
    export let distance = "";
    export let title = "";

  </script>
  
  <Modal title={title} bind:open={isModalOpen} autoclose outsideclose>
    <AttendanceCard name={name} employeeId={employeeId} time={time} distance={distance} date={date} present={present}/>
  </Modal>