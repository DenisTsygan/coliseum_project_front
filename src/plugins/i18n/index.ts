import { createI18n } from "vue-i18n";
//import pluralRules from "./rules/pluralization"; TODO maybe needed
import en from './locales/en.json'
import ru from './locales/ru.json'
import ua from './locales/ua.json'

export default createI18n({
    locale: import.meta.env.VITE_I18N_DEFAULT_LOCALE,
    legacy:false,
    messages:{
        en:en,
        ru:ru,
        ua:ua
    },
    //pluralRules
    
})