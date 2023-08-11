<script>
    import { Modal } from 'flowbite-svelte';
    import { Icon } from 'flowbite-svelte-icons';
    export let isModalOpen = false;
    export let message = "";
  </script>

  
  <Modal bind:open={isModalOpen} size="xs" autoclose outsideclose>
    <div class="text-center">
      <Icon name="exclamation-circle-outline" class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
      <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{message}</h3>
    </div>
  </Modal>