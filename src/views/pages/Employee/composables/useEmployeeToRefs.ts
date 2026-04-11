import { storeToRefs } from 'pinia'
import { useEmployeeStore } from '../store/employeeStore'

export function useEmployeeStoreRefs() {
  const store = useEmployeeStore()
  const refs = storeToRefs(store)
  return { ...refs }
}
