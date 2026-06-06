import { createI18n } from 'vue-i18n'
import yaml from 'js-yaml'
import enMessagesRaw from './locales/en.yml?raw'
import viMessagesRaw from './locales/vi.yml?raw'

// Get initial language: from localStorage first, then browser language
function getInitialLanguage(): string {
  // Check if language was previously saved in localStorage
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale && ['en', 'vi'].includes(savedLocale)) {
    return savedLocale
  }

  // If not saved, use browser language
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

  return 'en' // default fallback
}

// Parse YAML
function parseYaml(content: string): Record<string, any> {
  return yaml.load(content) as Record<string, any>
}

const i18n = createI18n({
  legacy: false,
  locale: getInitialLanguage(),
  fallbackLocale: 'en',
  messages: {
    en: parseYaml(enMessagesRaw),
    vi: parseYaml(viMessagesRaw)
  }
})

export default i18n
