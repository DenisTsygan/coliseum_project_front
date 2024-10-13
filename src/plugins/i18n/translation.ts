import i18n from "."
const Trans = {
    get supportedLocales() {
      return import.meta.env.VITE_I18N_SUPPORTED_LOCALES.split(",")
    },
    set currentLocale(newLocale:"en"|"ru"|"ua"){
        i18n.global.locale.value = newLocale
    },
    async switchLanguage(newLocale:"en"|"ru"|"ua"){
        //await Trans.loadLocaleMessages(newLocale) lazy loading
        Trans.currentLocale = newLocale
        document.querySelector("html")?.setAttribute("lang", newLocale)
    },
    /*async loadLocaleMessages(locale:"en"|"ru"|"ua") {
        if(!i18n.global.availableLocales.includes(locale)) { 
          const messages = await import(`@/plugins/i18n/locales/${locale}.json`)  
          i18n.global.setLocaleMessage(locale, messages.default)  
        }
        
        return nextTick()  
      }, */
  }
export default Trans