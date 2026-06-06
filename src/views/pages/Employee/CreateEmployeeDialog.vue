<template>
  <Dialog
    v-model:visible="isCreateModalVisible"
    :header="$t('employee.form.title')"
    :modal="true"
    class="w-full md:w-[60rem]"
  >
    <form @submit.prevent="onFormSubmit">
      <!-- First Row: First Name, Last Name, Nickname -->
      <div class="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label
            for="firstName"
            class="block text-surface-900 dark:text-surface-0 font-medium mb-2"
          >
            {{ $t('employee.firstName') }}
            <span class="text-red-500">*</span>
          </label>
          <InputText
            id="firstName"
            v-model="form.firstName"
            type="text"
            class="w-full"
            :class="{ 'ng-invalid ng-touched': errors.firstName }"
            required
          />
          <small
            v-if="errors.firstName"
            class="text-red-500 block mt-1"
          >
            {{ errors.firstName }}
          </small>
        </div>

        <div>
          <label
            for="lastName"
            class="block text-surface-900 dark:text-surface-0 font-medium mb-2"
          >
            {{ $t('employee.lastName') }}
            <span class="text-red-500">*</span>
          </label>
          <InputText
            id="lastName"
            v-model="form.lastName"
            type="text"
            class="w-full"
            :class="{ 'ng-invalid ng-touched': errors.lastName }"
            required
          />
          <small
            v-if="errors.lastName"
            class="text-red-500 block mt-1"
          >
            {{ errors.lastName }}
          </small>
        </div>

        <div>
          <label
            for="nickName"
            class="block text-surface-900 dark:text-surface-0 font-medium mb-2"
          >
            {{ $t('employee.nickName') }}
          </label>
          <InputText
            id="nickName"
            v-model="form.nickName"
            type="text"
            class="w-full"
          />
        </div>
      </div>

      <!-- Second Row: Date of Birth, Gender -->
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label
            for="dateOfBirth"
            class="block text-surface-900 dark:text-surface-0 font-medium mb-2"
          >
            {{ $t('employee.dateOfBirth') }}
            <span class="text-red-500">*</span>
          </label>
          <DatePicker
            id="dateOfBirth"
            v-model="dateOfBirthValue"
            date-format="dd/mm/yy"
            class="w-full"
            :class="{ 'ng-invalid ng-touched': errors.dateOfBirth }"
            required
          />
          <small
            v-if="errors.dateOfBirth"
            class="text-red-500 block mt-1"
          >
            {{ errors.dateOfBirth }}
          </small>
        </div>

        <div>
          <label class="block text-surface-900 dark:text-surface-0 font-medium mb-2">
            {{ $t('employee.gender') }}
            <span class="text-red-500">*</span>
          </label>
          <div class="flex gap-4">
            <div class="flex items-center">
              <RadioButton
                id="genderMale"
                v-model="form.gender"
                name="gender"
                :value="1"
              />
              <label
                for="genderMale"
                class="ml-2"
              >
                {{ $t('employee.genderMale') }}
              </label>
            </div>
            <div class="flex items-center">
              <RadioButton
                id="genderFemale"
                v-model="form.gender"
                name="gender"
                :value="0"
              />
              <label
                for="genderFemale"
                class="ml-2"
              >
                {{ $t('employee.genderFemale') }}
              </label>
            </div>
          </div>
          <small
            v-if="errors.gender"
            class="text-red-500 block mt-2"
          >
            {{ errors.gender }}
          </small>
        </div>
      </div>

      <!-- Third Row: Place of Birth -->
      <div class="mb-6">
        <label
          for="placeOfBirth"
          class="block text-surface-900 dark:text-surface-0 font-medium mb-2"
        >
          {{ $t('employee.placeOfBirth') }}
        </label>
        <InputText
          id="placeOfBirth"
          v-model="form.placeOfBirth"
          type="text"
          class="w-full"
        />
      </div>
    </form>

    <template #footer>
      <Button
        :label="$t('employee.form.cancel')"
        severity="secondary"
        @click="handleCancel"
      />
      <Button
        :label="$t('employee.form.submit')"
        :loading="isLoadingCreate"
        @click="onFormSubmit"
      />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { z } from 'zod'
import type { CreateEmployeeCommand } from '@/types/Employee'
import { useEmployee } from './composables/useEmployee'

const { t } = useI18n()
const { isCreateModalVisible, isLoadingCreate, handleCreateEmployee } = useEmployee()

const form = reactive<CreateEmployeeCommand>({
  firstName: '',
  lastName: '',
  nickName: '',
  email: '',
  dateOfBirth: '',
  placeOfBirth: '',
  gender: 1
})

const dateOfBirthValue = ref<Date | null>(null)
const errors = ref<Record<string, string>>({})

function getValidationSchema() {
  return z.object({
    firstName: z.string().min(1, { message: t('employee.firstNameRequired') }),
    lastName: z.string().min(1, { message: t('employee.lastNameRequired') }),
    dateOfBirth: z.string().min(1, { message: t('employee.dateOfBirthRequired') }),
    gender: z.number()
  })
}

function formatDateForApi(date: any): string {
  if (!date) return ''
  if (typeof date === 'string') return date
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

async function onFormSubmit() {
  errors.value = {}

  const schema = getValidationSchema()
  const validation = schema.safeParse({
    firstName: form.firstName.trim(),
    lastName: form.lastName.trim(),
    dateOfBirth: dateOfBirthValue.value ? formatDateForApi(dateOfBirthValue.value) : '',
    gender: form.gender
  })

  if (!validation.success) {
    validation.error.errors.forEach((err) => {
      const field = err.path[0] as string
      errors.value[field] = err.message
    })
    return
  }

  const submitData: CreateEmployeeCommand = {
    firstName: form.firstName.trim(),
    lastName: form.lastName.trim(),
    nickName: form.nickName?.trim() || '',
    email: '',
    dateOfBirth: formatDateForApi(dateOfBirthValue.value),
    placeOfBirth: form.placeOfBirth?.trim() || '',
    gender: form.gender
  }
  await handleCreateEmployee(submitData)
  resetForm()
}

function resetForm() {
  form.firstName = ''
  form.lastName = ''
  form.nickName = ''
  form.email = ''
  form.dateOfBirth = ''
  form.placeOfBirth = ''
  form.gender = 1
  dateOfBirthValue.value = null
  errors.value = {}
}

function handleCancel() {
  isCreateModalVisible.value = false
  resetForm()
}
</script>
