import type { AxiosResponse } from 'axios'
import axiosClient from '../axiosClient'
import { RecruitmentEndpoint } from '../enums/recruitmentEndpoint'
import type { PagingResultBase } from '@/types/shared/PagingResultBase'
import type { RecruitmentCampaign } from '@/types/Recruitment'
import type { Result } from '@/types/shared/Result'
import type { Candidate } from '@/types/Candidate'
import { CandidateEndpoint } from '../enums/candidateEndpoint'

export function candidateApi() {
  function getCandidatePaging(pageIndex: number, pageSize: number): Promise<PagingResultBase<Candidate[]>> {
    return axiosClient.get(CandidateEndpoint.Candidate, { params: { pageIndex, pageSize } })
  }
  function parseCvInformation(formData: FormData): Promise<Candidate> {
    return axiosClient.post(CandidateEndpoint.ParseCvInformation, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
  return {
    getCandidatePaging,
    parseCvInformation
  }
}
