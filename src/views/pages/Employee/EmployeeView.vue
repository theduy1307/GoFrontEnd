<template>
  <div class="card">
    <Toolbar class="mb-6">
      <template #end>
        <Button
          label="Create a new employee"
          icon="pi pi-plus"
          @click="handleCreateNewEmployee"
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
      <template #empty>No data available.</template>
      <template #loading>Loading employee data...</template>
      <Column
        field="firstName"
        header="First Name"
        style="min-width: 12rem"
      />
      <Column
        field="lastName"
        header="Last Name"
        style="min-width: 12rem"
      />
      <Column
        field="dateOfBirth"
        header="Date Of Birth"
        style="min-width: 12rem"
      >
        <template #body="slotProps">
          {{ formatDate(slotProps.data.dateOfBirth) }}
        </template>
      </Column>
      <Column
        field="gender"
        header="Gender"
        style="min-width: 10rem"
      >
        <template #body="slotProps">
          {{ getGenderLabel(slotProps.data.gender) }}
        </template>
      </Column>
      <Column
        field="isActive"
        header="Active"
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
  </div>
</template>

<script setup lang="ts">
import { useToastStore } from '@/shared/store/toast'
import { useEmployee } from './composables/useEmployee'

const GENDER_LABELS = {
  0: 'Male',
  1: 'Female'
}

const { getEmployeeDataTable, employeesDataTable } = useEmployee()
const toastStore = useToastStore()

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
  return GENDER_LABELS[gender as keyof typeof GENDER_LABELS] || 'Unknown'
}

function handleCreateNewEmployee() {
  toastStore.addToast({
    severity: 'info',
    summary: 'Information',
    detail: 'Feature to create new employee is under development, please come back later',
    life: 3000
  })
}
</script>
