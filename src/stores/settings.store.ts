import Trans from "@/plugins/i18n/translation"
import { LS_KEY_LANGUAGE_MODE } from "@/utils/const"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useSettingsStore = defineStore('settings',()=> {//TODO rename to languagestore

    const languageMode = ref<string>('')
    async function setLanguageMode (newValue:string){
        localStorage.setItem(LS_KEY_LANGUAGE_MODE,newValue)
        await Trans.switchLanguage(newValue)
        languageMode.value = newValue
    }
    function getLanguageMode (){
        return languageMode.value
    }
    const initSettings = async()=>{
        let languageModeSaved = localStorage.getItem(LS_KEY_LANGUAGE_MODE)
        if(!languageModeSaved ){
            languageModeSaved = import.meta.env.VITE_I18N_DEFAULT_LOCALE
        }
        setLanguageMode(languageModeSaved+"")
    }

    return {
        setLanguageMode, getLanguageMode, initSettings
    }
})