<template>
  <div class="card">
    <Toolbar class="mb-6">
      <template #start>
        <Button
          label="New"
          icon="pi pi-plus"
          class="mr-2"
        />
      </template>

      <template #end>
        <Button
          label="Import"
          icon="pi pi-plus"
          severity="secondary"
          class="mr-2"
          @click="importVisible = true"
        />
        <Button
          label="Export"
          icon="pi pi-upload"
          severity="secondary"
        />
      </template>
    </Toolbar>
    <DataTable
      :value="candidatesDataTable"
      :paginator="true"
      :rows="10"
      dataKey="id"
      :rowHover="true"
      filterDisplay="menu"
      showGridlines
    >
      <template #empty> Không có dữ liệu. </template>
      <template #loading> Đang tải dữ liệu </template>
      <Column
        field="fullName"
        header="Tên ứng viên"
        style="min-width: 12rem"
      />
      <Column
        field="gender"
        header="Giới tính"
        style="min-width: 12rem"
      />
      <Column
        field="email"
        header="Email"
        style="min-width: 12rem"
      />
      <Column
        field="phone"
        header="Số điện thoại"
        style="min-width: 12rem"
      />
      <Column
        field="location"
        header="Địa chỉ"
        style="min-width: 12rem"
      />
    </DataTable>
    <ImportCandidateDialog />
  </div>
</template>

<script setup lang="ts">
import { useCandidate } from './composables/useCandidate'
import ImportCandidateDialog from './ImportCandidateDialog.vue'
const { getCandidateDataTable, importVisible, candidatesDataTable } = useCandidate()

async function initializeData() {
  await Promise.allSettled([getCandidateDataTable()])
}
initializeData()
</script>
