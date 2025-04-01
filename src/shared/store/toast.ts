import { defineStore } from 'pinia'

export interface ToastMessage {
  severity: 'success' | 'info' | 'warn' | 'error'
  summary: string
  detail: string
  life?: number
}

export const useToastStore = defineStore('toast', {
  state: () => ({
    messages: [] as ToastMessage[]
  }),
  actions: {
    addToast(message: ToastMessage) {
      this.messages.push(message)
    },
    clearToasts() {
      this.messages = []
    }
  }
})
