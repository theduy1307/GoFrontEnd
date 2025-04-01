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
        v-model="form.email"
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
        v-model="form.password"
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
          v-model="form.remember"
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
import { useUserStore } from '@/shared/store/user'
import { Form } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { reactive, ref } from 'vue'
import { z } from 'zod'
import type { LoginFormData } from '../entities/LoginForm.type'

const initialValues = reactive<LoginFormData>({
  email: '',
  password: '',
  remember: false
})
const form = ref<LoginFormData>({
  email: '',
  password: '',
  remember: false
})
const { userLogin } = useUserStore()

const resolver = ref(
  zodResolver(
    z.object({
      email: z.string().min(1, { message: 'Vui lòng nhập email.' }),
      password: z.string().min(1, { message: 'Vui lòng nhập password.' })
    })
  )
)

const onFormSubmit = async ({ valid }: any) => {
  if (valid) {
    await userLogin(form.value.email, form.value.password)
  }
}
</script>
