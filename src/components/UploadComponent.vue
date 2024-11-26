<template>
  <div class="w-full max-w-md bg-white shadow-lg p-6 rounded-md">
    <h2 class="text-2xl font-semibold mb-6 text-center text-primary">Upload a Document</h2>
    <div
      class="border-dashed border-2 border-lightBorder rounded-md p-6 flex flex-col items-center justify-center mb-6"
      @drop.prevent="handleDrop"
      @dragover.prevent
    >
      <input
        type="file"
        id="fileInput"
        class="hidden"
        @change="handleFileChange"
      />
      <label
        for="fileInput"
        class="cursor-pointer text-secondary hover:underline text-center"
      >
        Drag & Drop or <span class="font-semibold">Click to Select a File</span>
      </label>
    </div>

    <!-- File Preview -->
    <div v-if="file" class="mb-4 p-4 border border-lightBorder rounded-md bg-gray-50">
      <p><strong>File Name:</strong> {{ file.name }}</p>
      <p><strong>Size:</strong> {{ (file.size / 1024).toFixed(2) }} KB</p>
    </div>

    <!-- Upload Button -->
    <button
      class="w-full btn"
      :class="{ 'bg-gray-300 cursor-not-allowed': !file || isUploading }"
      :disabled="!file || isUploading"
      @click="uploadFile"
    >
      <span v-if="!isUploading">Upload</span>
      <span v-else>Uploading... {{ progress }}%</span>
    </button>

    <!-- Status Message -->
    <p v-if="message" class="mt-4 text-center" :class="{ 'text-green-500': success, 'text-red-500': !success }">
      {{ message }}
    </p>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import axios from "axios";

export default {
  setup() {
    const file = ref<File | null>(null);
    const progress = ref(0);
    const isUploading = ref(false);
    const message = ref("");
    const success = ref(false);

    const handleFileChange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files) {
        file.value = target.files[0];
      }
    };

    const handleDrop = (event: DragEvent) => {
      if (event.dataTransfer && event.dataTransfer.files.length > 0) {
        file.value = event.dataTransfer.files[0];
      }
    };

    const uploadFile = async () => {
      if (!file.value) {
        message.value = "Please select a file!";
        success.value = false;
        return;
      }

      const formData = new FormData();
      formData.append("file", file.value);

      try {
        isUploading.value = true;
        const response = await axios.post("/api/upload", formData, {
          onUploadProgress: (event) => {
            if (event.total) {
              progress.value = Math.round((event.loaded / event.total) * 100);
            }
          },

        });
        console.log(response);
        message.value = "File uploaded successfully!";
        success.value = true;
      } catch (error) {
        console.error(error);
        message.value = "Upload failed. Please try again.";
        success.value = false;
      } finally {
        isUploading.value = false;
        progress.value = 0;
      }
    };

    return {
      file,
      progress,
      isUploading,
      message,
      success,
      handleFileChange,
      handleDrop,
      uploadFile,
    };
  },
};
</script>
