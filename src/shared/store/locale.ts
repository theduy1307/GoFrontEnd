import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export const useLocaleStore = defineStore('locale', () => {
  const { locale } = useI18n()

  // Initialize from localStorage (which is populated on first visit by i18n)
  const getInitialLocale = () => {
    const savedLocale = localStorage.getItem('locale')
    if (savedLocale && ['en', 'vi'].includes(savedLocale)) {
      return savedLocale
    }

    const browserLang = navigator.language.toLowerCase()
    const supportedLanguages = ['en', 'vi']

    if (supportedLanguages.includes(browserLang)) {
      return browserLang
    }

    if (browserLang.startsWith('vi')) {
      return 'vi'
    }

    if (browserLang.startsWith('en')) {
      return 'en'
    }

    return 'en'
  }

  const currentLocale = ref<string>(getInitialLocale())

  function setLocale(newLocale: string) {
    if (!['en', 'vi'].includes(newLocale)) {
      console.warn(`Unsupported locale: ${newLocale}`)
      return
    }
    currentLocale.value = newLocale
    locale.value = newLocale as any
    localStorage.setItem('locale', newLocale)
  }

  return {
    currentLocale,
    setLocale
  }
})
