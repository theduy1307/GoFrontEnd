import type { CandidateDataTableInfo } from '@/types/Candidate'
import type { JobsGoResponse } from '@/types/JobsGoResponse'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCandidateStore = defineStore('candidate', () => {
  const candidatesDataTable = ref<CandidateDataTableInfo[]>([])
  const importVisible = ref<boolean>(false)
  const fileUpload = ref<File | null>(null)
  const isLoadingImport = ref<boolean>(false)
  const candidateInfo = ref<JobsGoResponse | null>(null)
  return { candidatesDataTable, importVisible, fileUpload, isLoadingImport, candidateInfo }
})
