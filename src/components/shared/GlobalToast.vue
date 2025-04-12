<script setup lang="ts">
import { useToastStore } from '@/shared/store/toast'
import { useToast } from 'primevue/usetoast'
import { watchEffect } from 'vue'

const toast = useToast()
const toastStore = useToastStore()

// Theo dõi thay đổi và hiển thị Toast
watchEffect(() => {
  if (toastStore.messages.length > 0) {
    toastStore.messages.forEach((msg, index) => {
      setTimeout(() => {
        // ✅ Dùng setTimeout để Toast hiển thị từng cái một
        toast.add({
          severity: msg.severity,
          summary: msg.summary,
          detail: msg.detail,
          life: msg.life || 3000
        })
      }, index * 500) // Mỗi thông báo cách nhau 500ms
    })

    // ✅ Xóa từng thông báo sau khi PrimeVue đã hiển thị xong
    setTimeout(
      () => {
        toastStore.clearToasts()
      },
      toastStore.messages.length * 500 + 100
    )
  }
})
</script>

<template>
  <Toast />
</template>
