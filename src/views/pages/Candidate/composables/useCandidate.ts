import type { Paging } from '@/types/shared/Paging'
import { ref } from 'vue'
import { candidateApi } from '@/infrastructure/apis/candidateApi'
import { useCandidateStoreRefs } from './useCandidateToRefs'
import type { JobsGoResponse } from '@/types/JobsGoResponse'

export function useCandidate() {
  const { getCandidatePaging } = candidateApi()
  const { candidatesDataTable, importVisible, fileUpload, isLoadingImport, candidateInfo } = useCandidateStoreRefs()
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
  function handleSetCandidateInfo(param: JobsGoResponse) {
    candidateInfo.value = param
  }
  return {
    candidatesDataTable,
    importVisible,
    paging,
    isLoadingImport,
    fileUpload,
    candidateInfo,
    getCandidateDataTable,
    handleToggleImport,
    handleSetCandidateInfo
  }
}
