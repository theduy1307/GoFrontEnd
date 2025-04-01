import type { AxiosResponse } from 'axios'
import axiosClient from '../axiosClient'
import { RecruitmentEndpoint } from '../enums/recruitmentEndpoint'
import type { PagingResultBase } from '@/types/shared/PagingResultBase'
import type { RecruitmentCampaign } from '@/types/Recruitment'
import type { Result } from '@/types/shared/Result'

export function recruitmentApi() {
  function getRecruitmentPaging(pageIndex: number, pageSize: number): Promise<PagingResultBase<RecruitmentCampaign[]>> {
    return axiosClient.get(RecruitmentEndpoint.Recruitment, { params: { pageIndex, pageSize } })
  }

  return {
    getRecruitmentPaging
  }
}
