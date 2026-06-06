import type { Employee } from '@/types/Employee'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEmployeeStore = defineStore('employee', () => {
  const employeesDataTable = ref<Employee[]>([])
  const isCreateModalVisible = ref<boolean>(false)
  const isLoadingCreate = ref<boolean>(false)

  return { employeesDataTable, isCreateModalVisible, isLoadingCreate }
})
