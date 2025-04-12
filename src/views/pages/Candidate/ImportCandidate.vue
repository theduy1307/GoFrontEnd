<template>
  <div class="flex flex-col gap-6 items-center justify-center">
    <FileUpload
      mode="basic"
      name="file"
      accept=".pdf,.doc,.docx"
      :maxFileSize="2000000"
      chooseLabel="Chọn File"
      @select="onFileSelect($event.files)"
    />
    <Button
      v-if="fileUpload"
      @click="uploadFile"
      icon="pi pi-cloud-upload"
      label="Upload"
    ></Button>
  </div>
</template>

<script setup lang="ts">
import { candidateApi } from '@/infrastructure/apis/candidateApi'
import { useToastStore } from '@/shared/store/toast'
import { useCandidateStoreRefs } from './composables/useCandidateToRefs'

const toast = useToastStore()
const { parseCvInformation } = candidateApi()
const { fileUpload } = useCandidateStoreRefs()
const uploadFile = async () => {
  if (!fileUpload.value) {
    toast.addToast({
      severity: 'warn',
      summary: 'Chưa chọn file',
      detail: 'Vui lòng chọn một file để upload!'
    })
    return
  }

  // Kiểm tra loại file (chỉ chấp nhận PDF)
  if (!fileUpload || !['application/pdf', 'application/doc', 'application/docx'].includes(fileUpload.value.type)) {
    toast.addToast({
      severity: 'error',
      summary: 'Lỗi',
      detail: 'Chỉ chấp nhận định dạng .pdf, .docx, .doc!',
      life: 3000
    })
    return
  }

  const formData = new FormData()
  formData.append('file', fileUpload.value)

  try {
    const response = await parseCvInformation(formData)
    if (response) {
      toast.addToast({ severity: 'success', summary: 'Thành công', detail: 'Tải lên thành công!', life: 3000 })
      console.log('Response:', response)
    }
  } catch (error) {
    toast.addToast({ severity: 'error', summary: 'Lỗi', detail: 'Upload thất bại!', life: 3000 })
    console.error('Lỗi khi upload file:', error)
  }
}
const onFileSelect = (event: File[]) => {
  if (event.length > 0) {
    fileUpload.value = event[0] // Lấy file đầu tiên
  }
}
</script>
