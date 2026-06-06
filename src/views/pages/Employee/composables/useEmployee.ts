import type { Paging } from '@/types/shared/Paging'
import type { CreateEmployeeCommand } from '@/types/Employee'
import { ref } from 'vue'
import { employeeApi } from '@/infrastructure/apis/employeeApi'
import { useEmployeeStoreRefs } from './useEmployeeToRefs'
import { useToastStore } from '@/shared/store/toast'
import { useI18n } from 'vue-i18n'

export function useEmployee() {
  const { getEmployeePaging, createEmployee } = employeeApi()
  const { employeesDataTable, isCreateModalVisible, isLoadingCreate } = useEmployeeStoreRefs()
  const toastStore = useToastStore()
  const { t } = useI18n()

  const paging = ref<Paging>({
    pageIndex: 1,
    pageSize: 10
  })

  async function getEmployeeDataTable() {
    const data = await getEmployeePaging(paging.value.pageIndex, paging.value.pageSize)
    employeesDataTable.value = [...data.items]
  }

  async function handleCreateEmployee(formData: CreateEmployeeCommand) {
    isLoadingCreate.value = true
    try {
      const newEmployeeId = await createEmployee(formData)
      toastStore.addToast({
        severity: 'success',
        summary: t('messages.success'),
        detail: t('employee.createSuccess'),
        life: 3000
      })
      isCreateModalVisible.value = false
      await getEmployeeDataTable()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t('employee.createError')
      toastStore.addToast({
        severity: 'error',
        summary: t('messages.error'),
        detail: errorMessage,
        life: 3000
      })
    } finally {
      isLoadingCreate.value = false
    }
  }

  return {
    employeesDataTable,
    isCreateModalVisible,
    isLoadingCreate,
    paging,
    getEmployeeDataTable,
    handleCreateEmployee
  }
}
