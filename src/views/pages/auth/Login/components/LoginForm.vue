<template>
  <Form
    v-slot="$form"
    :initialValues
    :resolver
    @submit="onFormSubmit"
    cla
  >
    <div class="mb-8">
      <label
        for="email1"
        class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2"
        >Email</label
      >
      <InputText
        id="email1"
        type="text"
        placeholder="example@tinyhr.com"
        class="w-full md:w-[30rem] mb-1"
        name="email"
      />
      <Message
        v-if="$form.email?.invalid"
        severity="error"
        size="small"
        variant="simple"
        >{{ $form.email.error?.message }}</Message
      >
    </div>
    <div class="mb-4">
      <label
        for="password1"
        class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2"
        >Mật khẩu</label
      >
      <Password
        id="password1"
        name="password"
        placeholder="Nhập mật khẩu"
        :toggleMask="true"
        class="mb-2"
        fluid
        :feedback="false"
      ></Password>
      <Message
        v-if="$form.password?.invalid"
        severity="error"
        size="small"
        variant="simple"
        >{{ $form.password.error?.message }}</Message
      >
    </div>

    <div class="flex items-center justify-between mt-2 mb-8 gap-8">
      <div class="flex items-center">
        <Checkbox
          name="remember"
          id="rememberme1"
          binary
          class="mr-2"
        ></Checkbox>
        <label for="rememberme1">Remember me</label>
      </div>
      <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">Forgot password?</span>
    </div>
    <Button
      type="submit"
      label="Sign In"
      class="w-full"
    />
  </Form>
</template>
<script setup lang="ts">
import { Form } from '@primevue/forms'
import { useToast } from 'primevue/usetoast'
import { reactive } from 'vue'

const toast = useToast()
const initialValues = reactive({
  email: '',
  password: '',
  remember: false
})

const resolver = ({ values }: any) => {
  const errors: any = {}

  if (!values.username) {
    errors.email = [{ message: 'Vui lòng nhập email.' }]
  }
  if (!values.password) {
    errors.password = [{ message: 'Vui lòng nhập password.' }]
  }

  return {
    values,
    errors
  }
}

const onFormSubmit = ({ valid }: any) => {
  if (valid) {
    toast.add({
      severity: 'success',
      summary: 'Form is submitted.',
      life: 3000
    })
  }
}
</script>
