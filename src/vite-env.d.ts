/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_I18N_DEFAULT_LOCALE:string
    readonly VITE_I18N_SUPPORTED_LOCALES:string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}