<template>
  <div class="card">
    <Toolbar class="mb-6">
      <template #end>
        <Button
          :label="$t('employee.create')"
          icon="pi pi-plus"
          @click="handleOpenCreateModal"
        />
      </template>
    </Toolbar>
    <DataTable
      :value="employeesDataTable"
      :paginator="true"
      :rows="10"
      dataKey="id"
      :rowHover="true"
      filterDisplay="menu"
      showGridlines
    >
      <template #empty>{{ $t('common.noData') }}</template>
      <template #loading>{{ $t('common.loading') }}</template>
      <Column
        field="firstName"
        :header="$t('table.columns.firstName')"
        style="min-width: 12rem"
      />
      <Column
        field="lastName"
        :header="$t('table.columns.lastName')"
        style="min-width: 12rem"
      />
      <Column
        field="dateOfBirth"
        :header="$t('table.columns.dateOfBirth')"
        style="min-width: 12rem"
      >
        <template #body="slotProps">
          {{ formatDate(slotProps.data.dateOfBirth) }}
        </template>
      </Column>
      <Column
        field="gender"
        :header="$t('table.columns.gender')"
        style="min-width: 10rem"
      >
        <template #body="slotProps">
          {{ getGenderLabel(slotProps.data.gender) }}
        </template>
      </Column>
      <Column
        field="isActive"
        :header="$t('table.columns.active')"
        style="min-width: 10rem"
      >
        <template #body="slotProps">
          <InputSwitch
            v-model="slotProps.data.isActive"
            :disabled="true"
          />
        </template>
      </Column>
    </DataTable>
    <CreateEmployeeDialog />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useEmployee } from './composables/useEmployee'
import CreateEmployeeDialog from './CreateEmployeeDialog.vue'

const { t } = useI18n()
const { getEmployeeDataTable, employeesDataTable, isCreateModalVisible } = useEmployee()

async function initializeData() {
  await Promise.allSettled([getEmployeeDataTable()])
}

initializeData()

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }
  return date.toLocaleDateString('en-US', options)
}

function getGenderLabel(gender: number): string {
  const genderLabels: Record<number, string> = {
    0: t('employee.genderFemale'),
    1: t('employee.genderMale')
  }
  return genderLabels[gender] || 'Unknown'
}

function handleOpenCreateModal() {
  isCreateModalVisible.value = true
}
</script>
