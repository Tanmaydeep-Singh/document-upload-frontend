<template>
  <div>
    <nav class="bg-white shadow-md p-4 flex justify-between items-center font-montserrat">
      <div class="text-2xl font-semibold text-primary">Document System</div>
      <div>
        <router-link to="/" class="mr-4 text-text hover:underline">Home</router-link>
      </div>
    </nav>
    <main class="p-6">
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
export default {};
</script>
