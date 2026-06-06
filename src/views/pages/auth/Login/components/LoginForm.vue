<template>
  <Form
    v-slot="$form"
    :initialValues
    :resolver
    @submit="onFormSubmit"
  >
    <div class="mb-8">
      <label
        for="email1"
        class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2"
        >{{ $t('auth.login.email.label') }}</label
      >
      <InputText
        id="email1"
        type="text"
        :placeholder="$t('auth.login.email.placeholder')"
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
        >{{ $t('auth.login.password.label') }}</label
      >
      <Password
        id="password1"
        name="password"
        :placeholder="$t('auth.login.password.placeholder')"
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
        <label for="rememberme1">{{ $t('auth.login.rememberMe') }}</label>
      </div>
      <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">{{
        $t('auth.login.forgotPassword')
      }}</span>
    </div>
    <div class="flex justify-end mb-4">
      <div class="w-1/3">
        <Dropdown
          v-model="localeStore.currentLocale"
          :options="languageOptions"
          optionLabel="label"
          optionValue="value"
          @change="localeStore.setLocale(localeStore.currentLocale)"
          class="w-full"
        />
      </div>
    </div>
    <Button
      type="submit"
      :label="$t('auth.login.signIn')"
      class="w-full"
    />
  </Form>
</template>
<script setup lang="ts">
import { useUserStore } from '@/shared/store/user'
import { useI18n } from 'vue-i18n'
import { useLocaleStore } from '@/shared/store/locale'
import { Form } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { reactive, ref } from 'vue'
import { z } from 'zod'
import type { LoginFormData } from '../entities/LoginForm.type'

const { t } = useI18n()
const localeStore = useLocaleStore()

const languageOptions = [
  { label: 'English', value: 'en' },
  { label: 'Tiếng Việt', value: 'vi' }
]

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
      email: z.string().min(1, { message: t('auth.login.errors.emailRequired') }),
      password: z.string().min(1, { message: t('auth.login.errors.passwordRequired') })
    })
  )
)

const onFormSubmit = async (event: any) => {
  const isValid = event.valid

  if (isValid) {
    await userLogin(form.value.email, form.value.password)
  }
}
</script>
