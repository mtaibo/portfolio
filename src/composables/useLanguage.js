import { ref, computed } from 'vue'
import { content } from '../content/index.js'

const lang = ref(localStorage.getItem('lang') || 'en')

export function useLanguage() {
  const t = computed(() => content[lang.value])

  function setLang(code) {
    lang.value = code
    localStorage.setItem('lang', code)
  }

  function toggleLanguage() {
    setLang(lang.value === 'en' ? 'es' : 'en')
  }

  return { lang, t, setLang, toggleLanguage }
}
