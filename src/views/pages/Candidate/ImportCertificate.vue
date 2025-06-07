<template>
  <div class="container">
    <div
      v-for="(upload, index) in fileUploads"
      :key="index"
      class="div-import"
    >
      <FileUpload
        name="files"
        :multiple="false"
        accept="image/*"
        :customUpload="true"
        @select="onFileSelect(index, $event)"
        @remove="onFileRemove(index, $event)"
      />
      <ul>
        <li
          v-for="(file, i) in upload.files"
          :key="i"
        >
          {{ file.name }} - {{ (file.size / 1024).toFixed(2) }} KB
        </li>
      </ul>
    </div>

    <div class="flex flex-col gap-6 items-center justify-center">
      <Button class="flex flex-col gap-6 items-center justify-center" @click="uploadFiles" label="Upload" icon="pi pi-cloud-upload" />
    </div>
    
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: block;
}
.div-import {
  margin: 1% 25%;
  padding: 0 10%;
}
</style>

<script setup lang="ts">
import { candidateApi } from '@/infrastructure/apis/candidateApi'
import { useToastStore } from '@/shared/store/toast'
import { ref } from 'vue'
const fileUploads = ref<{ files: File[] }[]> ([{ files: [] }, { files: [] }])
const toast = useToastStore()
const { visionApi } = candidateApi()

    const onFileSelect = (index: number, event: any) => {
      fileUploads.value[index].files.push(...event.files);
    };

    const onFileRemove = (index: number, event: any) => {
      fileUploads.value[index].files = fileUploads.value[index].files.filter(file => file !== event.file);
    };

    const uploadFiles = async () => {
      const formData = new FormData();

      fileUploads.value.forEach((upload) => {
        upload.files.forEach((file) => {
          formData.append(`lstFile`, file);
        });
      });
      
      try {
        const response = await visionApi(formData)
          if (response) {
          toast.addToast({ severity: 'success', summary: 'Thành công', detail: 'Tải lên thành công!', life: 3000 })
          console.log('Response:', response)
        }
      } catch (error) {
        toast.addToast({ severity: 'error', summary: 'Lỗi', detail: 'Upload thất bại!', life: 3000 })
        console.error('Lỗi khi upload file:', error)
      }
    }

</script>
