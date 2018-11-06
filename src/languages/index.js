import Vue from 'vue';
import Vuei18n from 'vue-i18n';
import enTranslations from './en';
import esTranslation from './es';


Vue.use(Vuei18n)

const messages = {
  ...enTranslations,
  ...esTranslation
}

export const i18n = new Vuei18n({
  locale:'en',
  messages
})
