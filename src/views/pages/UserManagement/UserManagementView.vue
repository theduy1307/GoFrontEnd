<script setup lang="ts">
import { userApi } from '@/infrastructure/apis/userApi'
import type { Employee } from '@/types/Employee'
import { onMounted, ref } from 'vue'

const params = ref({ pageSize: 10, pageIndex: 1 })
const employees = ref<Employee[]>([])

const fetchData = async () => {
  const response = await userApi().getEmployeePaging(params.value.pageIndex, params.value.pageSize)
  employees.value = [...response.items]
}
onMounted(() => {
  fetchData()
})
function create() {}
</script>

<template>
  <div class="card">
    <div class="font-semibold text-xl mb-4">Quản lý nhân viên</div>

    <DataTable
      :value="employees"
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
            label="Thêm nhân viên"
            @click="create()"
          />
        </div>
      </template>
      <template #empty> Không có dữ liệu. </template>
      <template #loading> Đang tải dữ liệu </template>
      <Column
        field="fullName"
        header="Tên nhân viên"
        style="min-width: 12rem"
      >
      </Column>
      <Column
        field="nickName"
        header="Nick name"
        style="min-width: 12rem"
      >
      </Column>
      <Column
        header="Ngày sinh"
        style="min-width: 12rem"
      >
        <template #body="{ data }">
          {{ data.dateOfBirth && new Date(data.dateOfBirth).toLocaleDateString() }}
        </template>
      </Column>
      <Column
        field="isActive"
        header="Trạng thái"
        style="min-width: 5rem"
      >
        <template #body="{ data }">
          <ToggleSwitch
            readonly
            v-model="data.isActive"
          />
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
