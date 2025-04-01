import { storeToRefs } from 'pinia'
import { useCandidateStore } from '../store/candidateStore'

export function useCandidateStoreRefs() {
  const store = useCandidateStore()
  const refs = storeToRefs(store)
  return { ...refs }
}
