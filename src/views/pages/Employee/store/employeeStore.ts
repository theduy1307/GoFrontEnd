import type { Employee } from '@/types/Employee'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEmployeeStore = defineStore('employee', () => {
  const employeesDataTable = ref<Employee[]>([])

  return { employeesDataTable }
})
