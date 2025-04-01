import type { Candidate } from '@/types/Candidate'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCandidateStore = defineStore('candidate', () => {
  const candidatesDataTable = ref<Candidate[]>([])
  const importVisible = ref<boolean>(false)
  return { candidatesDataTable, importVisible }
})
