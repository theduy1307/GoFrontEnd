<template>
  <Dialog
    v-model:visible="importVisible"
    header="Nhập liệu ứng viên từ CV"
    :style="{ width: '75%' }"
    :modal="true"
  >
    <Stepper
      value="1"
      class="basis-[50rem]"
    >
      <StepList>
        <Step value="1">Tải lên CV</Step>
        <Step value="2">Tải lên chứng chỉ</Step>
        <Step value="3">Xác thực</Step>
      </StepList>
      <StepPanels>
        <StepPanel value="1">
          <div class="flex flex-col h-48">
            <div
              class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium"
            >
              <ImportCandidate />
            </div>
          </div>
        </StepPanel>
        <StepPanel value="2">
          <div class="flex flex-col h-48">
            <div
              class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium"
            >
              Content II
            </div>
          </div>
        </StepPanel>
        <StepPanel value="3">
          <div class="flex flex-col h-48">
            <div
              class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium"
            >
              Content III
            </div>
          </div>
        </StepPanel>
      </StepPanels>
    </Stepper>
    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        text
        @click="importVisible = false"
      />
      <Button
        label="Save"
        icon="pi pi-check"
      />
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { useCandidate } from './composables/useCandidate'
import ImportCandidate from './ImportCandidate.vue'

const { importVisible, handleToggleImport } = useCandidate()
</script>
