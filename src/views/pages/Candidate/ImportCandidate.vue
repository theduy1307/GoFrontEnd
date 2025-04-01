<template>
  <div class="card">
    <Toast />
    <FileUpload
      name="demo[]"
      accept=".pdf, .doc, .docx"
      :customUpload="true"
      @uploader="uploadFile"
      :maxFileSize="1000000"
    >
    </FileUpload>
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import { candidateApi } from '@/infrastructure/apis/candidateApi'
import type { FileUploadUploaderEvent } from 'primevue/fileupload'

const toast = useToast()
const { parseCvInformation } = candidateApi()
const uploadFile = async (event: FileUploadUploaderEvent) => {
  const file = (event.files as File[])[0]

  // Kiểm tra loại file (chỉ chấp nhận PDF)
  if (!file || !['application/pdf', 'application/doc', 'application/docx'].includes(file.type)) {
    toast.add({ severity: 'error', summary: 'Lỗi', detail: 'Chỉ chấp nhận định dạng .pdf, .docx, .doc!', life: 3000 })
    return
  }

  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await parseCvInformation(formData)
    if (response) {
      toast.add({ severity: 'success', summary: 'Thành công', detail: 'Tải lên thành công!', life: 3000 })
      console.log('Response:', response)
    }
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Lỗi', detail: 'Upload thất bại!', life: 3000 })
    console.error('Lỗi khi upload file:', error)
  }
}
</script>
