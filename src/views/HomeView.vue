<template>
  <div class="flex flex-col items-center text-center justify-center">
    <h1 class="text-4xl font-semibold text-primary mb-6">Welcome to the Document Upload System</h1>
    <p class="mb-4">Easily upload and manage your documents securely.</p>
    <UploadComponent/>
  </div>
</template>



<script lang="ts">
import UploadComponent from "../components/UploadComponent.vue";

export default {
  components: { UploadComponent },
};
</script>