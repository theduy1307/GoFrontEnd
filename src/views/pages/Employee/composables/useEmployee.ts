import type { Paging } from '@/types/shared/Paging'
import { ref } from 'vue'
import { employeeApi } from '@/infrastructure/apis/employeeApi'
import { useEmployeeStoreRefs } from './useEmployeeToRefs'

export function useEmployee() {
  const { getEmployeePaging } = employeeApi()
  const { employeesDataTable } = useEmployeeStoreRefs()
  const paging = ref<Paging>({
    pageIndex: 1,
    pageSize: 10
  })

  async function getEmployeeDataTable() {
    const data = await getEmployeePaging(paging.value.pageIndex, paging.value.pageSize)
    employeesDataTable.value = [...data.items]
  }

  return {
    employeesDataTable,
    paging,
    getEmployeeDataTable
  }
}
