<script setup lang="ts">
import { useToastStore } from '@/shared/store/toast'
import { useToast } from 'primevue/usetoast'
import { watchEffect } from 'vue'

const toast = useToast()
const toastStore = useToastStore()

// Theo dõi thay đổi và hiển thị Toast
watchEffect(() => {
  if (toastStore.messages.length > 0) {
    toastStore.messages.forEach((msg) => {
      toast.add({
        severity: msg.severity,
        summary: msg.summary,
        detail: msg.detail,
        life: msg.life || 3000
      })
    })

    toastStore.clearToasts() // Xóa sau khi hiển thị
  }
})
</script>

<template>
  <Toast />
</template>
