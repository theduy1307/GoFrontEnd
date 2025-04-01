<script setup lang="ts">
import { recruitmentApi } from '@/infrastructure/apis/recruitmentApi'
import type { RecruitmentCampaign } from '@/types/Recruitment'
import { onMounted, ref } from 'vue'

const params = ref({ pageSize: 10, pageIndex: 1 })
const recruitments = ref<RecruitmentCampaign[]>([])

const fetchData = async () => {
  const response = await recruitmentApi().getRecruitmentPaging(params.value.pageIndex, params.value.pageSize)
  recruitments.value = [...response.items]
}
onMounted(() => {
  fetchData()
})
function create() {}
</script>

<template>
  <div class="card">
    <div class="font-semibold text-xl mb-4">Đợt tuyển dụng</div>

    <DataTable
      :value="recruitments"
      :paginator="true"
      :rows="10"
      dataKey="id"
      :rowHover="true"
      filterDisplay="menu"
      showGridlines
    >
      <template #header>
        <div class="text-end pb-4">
          <Button
            icon="pi pi-plus"
            label="Tạo đợt tuyển dụng"
            @click="create()"
          />
        </div>
      </template>
      <template #empty> Không có dữ liệu. </template>
      <template #loading> Đang tải dữ liệu </template>
      <Column
        field="name"
        header="Tên đợt"
        style="min-width: 12rem"
      >
      </Column>
      <Column
        field="jobDescription"
        header="Mô tả công việc"
        style="min-width: 12rem"
      >
      </Column>
      <Column
        field="createdBy"
        header="Người tạo"
        style="min-width: 12rem"
      >
      </Column>
      <Column
        header="Ngày tạo"
        style="min-width: 12rem"
      >
        <template #body="{ data }">
          {{ data.createDate && new Date(data.createDate).toLocaleDateString() }}
        </template>
      </Column>
      <Column
        field="modifiedBy"
        header="Người chỉnh sửa gần nhất"
        style="min-width: 12rem"
      >
      </Column>
      <Column
        field="modifiedDate"
        header="Người chỉnh sửa gần nhất"
        style="min-width: 12rem"
      >
        <template #body="{ data }">
          {{ data.modifiedDate && new Date(data.modifiedDate).toLocaleDateString() }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped lang="scss">
:deep(.p-datatable-frozen-tbody) {
  font-weight: bold;
}

:deep(.p-datatable-scrollable .p-frozen-column) {
  font-weight: bold;
}
</style>
