import type { Paging } from '@/types/shared/Paging'
import { ref } from 'vue'
import { candidateApi } from '@/infrastructure/apis/candidateApi'
import { useCandidateStoreRefs } from './useCandidateToRefs'

export function useCandidate() {
  const { getCandidatePaging } = candidateApi()
  const { candidatesDataTable, importVisible } = useCandidateStoreRefs()
  const paging = ref<Paging>({
    pageIndex: 1,
    pageSize: 10
  })
  async function getCandidateDataTable() {
    const data = await getCandidatePaging(paging.value.pageIndex, paging.value.pageSize)
    candidatesDataTable.value = [...data.items]
  }

  function handleToggleImport(isVisible: boolean) {
    importVisible.value = isVisible
  }
  return {
    candidatesDataTable,
    importVisible,
    paging,
    getCandidateDataTable,
    handleToggleImport
  }
}
