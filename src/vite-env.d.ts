/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_I18N_DEFAULT_LOCALE:string
    readonly VITE_I18N_SUPPORTED_LOCALES:string
    readonly VITE_BACKEND_API_BASE_URL:string
    readonly VITE_BASE_URL:string
    readonly VITE_PORT:string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}