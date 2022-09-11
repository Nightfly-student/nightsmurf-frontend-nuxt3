import { createI18n } from 'vue-i18n'
import en from '../locales/en.json'
import fr from '../locales/fr.json'
import dutch from '../locales/dutch.json'
import de from '../locales/de.json'
import es from '../locales/es.json'

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    fallbackLocale: 'en',
    locale: 'en',
    messages: {
        en,
        de,
        fr,
        nl: dutch,
        es
    }
  })

  vueApp.use(i18n)
})