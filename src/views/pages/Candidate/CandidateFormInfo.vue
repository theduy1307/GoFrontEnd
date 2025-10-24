<template>
  <div class="card flex flex-col gap-4 w-full">
    <Form
      :resolver
      @submit="onFormSubmit"
      class="flex flex-col gap-4 w-full"
    >
      <div class="flex flex-col md:flex-row gap-4">
        <FormField
          v-slot="$field"
          as="section"
          name="fullName"
          initialValue=""
          class="w-full"
        >
          <InputText
            v-model="formValues.fullName"
            type="text"
            class="w-full"
            placeholder="Full name"
          />
          <Message
            v-if="$field?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $field.error?.message }}</Message
          >
        </FormField>
        <FormField
          v-slot="$field"
          as="section"
          name="dob"
          initialValue=""
          class="w-full"
        >
          <DatePicker
            v-model="formValues.dob"
            placeholder="Date of birth"
            name="dob"
            fluid
          />
          <Message
            v-if="$field?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $field.error?.message }}</Message
          >
        </FormField>
        <FormField
          v-slot="$field"
          as="section"
          name="gender"
          initialValue=""
          class="w-full"
        >
          <Select
            v-model="formValues.gender"
            :options="genders"
            optionLabel="name"
            placeholder="Select a gender"
            class="w-full"
          />
          <Message
            v-if="$field?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $field.error?.message }}</Message
          >
        </FormField>
      </div>
      <div class="flex flex-col md:flex-row gap-4">
        <FormField
          v-slot="$field"
          as="section"
          name="email"
          initialValue=""
          class="w-full"
        >
          <InputText
            v-model="formValues.email"
            type="text"
            class="w-full"
            placeholder="Email"
          />
          <Message
            v-if="$field?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $field.error?.message }}</Message
          >
        </FormField>
        <FormField
          v-slot="$field"
          as="section"
          name="address"
          initialValue=""
          class="w-full"
        >
          <InputText
            v-model="formValues.address"
            type="text"
            class="w-full"
            placeholder="Address"
          />
          <Message
            v-if="$field?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $field.error?.message }}</Message
          >
        </FormField>
        <FormField
          v-slot="$field"
          as="section"
          name="phone"
          initialValue=""
          class="w-full"
        >
          <InputText
            v-model="formValues.phone"
            type="text"
            class="w-full"
            placeholder="Phone number"
          />
          <Message
            v-if="$field?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $field.error?.message }}</Message
          >
        </FormField>
      </div>
      <Button
        type="submit"
        severity="secondary"
        label="Submit"
      />
    </Form>
  </div>
</template>
<script setup>
import { reactive, ref, watch } from 'vue'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'
import { useToast } from 'primevue/usetoast'
import { useCandidateStore } from './store/candidateStore'
import { useCandidate } from './composables/useCandidate'

const { candidateInfo } = useCandidate()
const toast = useToast()
const formValues = ref({
  fullName: '',
  email: '',
  dob: '',
  address: '',
  gender: {},
  phone: ''
})
const genders = ref([
  { name: 'Male', code: 'male' },
  { name: 'Female', code: 'female' },
  { name: 'N/A', code: 'NA' }
])
const resolver = zodResolver(
  z.object({
    fullName: z.string().min(1, { message: 'Candidate name is required.' }),
    dob: z
      .date()
      .nullable()
      .refine((val) => val !== null, {
        message: 'Date cannot be null'
      }),
    email: z.string().min(1, { message: 'Email is required.' }),
    phone: z.string().min(1, { message: 'Phone number is required.' }),
    address: z.string().min(1, { message: 'Address is required.' })
  })
)

const onFormSubmit = ({ valid }) => {
  if (valid) {
    toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 })
  }
}
watch(
  () => candidateInfo.value,
  (newVal) => {
    if (newVal) {
      const { name, dob, email, location, gender, phone } = newVal
      formValues.value.fullName = name
      ;(formValues.value.dob = dob),
        (formValues.value.email = email),
        (formValues.value.address = location),
        (formValues.value.gender = genders.value.find((x) => x.code === gender)),
        (formValues.value.phone = phone)
    }
  },
  { immediate: true }
)
</script>
