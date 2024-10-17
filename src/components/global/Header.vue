<script setup lang="ts">
import { Button } from '@/components/shadcn/ui/button'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/shadcn/ui/select'
import { Separator } from '@/components/shadcn/ui/separator';
import { Label } from "@/components/shadcn/ui/label"
import { Settings, ArrowRight } from 'lucide-vue-next';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
} from '@/components/shadcn/ui/sheet'

import { computed, ref } from 'vue';
import Trans from '@/plugins/i18n/translation';
import { useSettingsStore } from '@/stores/settings.store';

const settingsStore = useSettingsStore()
const avaibleLanguageModes = ref(Trans.supportedLocales)
const languageMode = computed(() => {
    return settingsStore.getLanguageMode()
})
const changeLanguageMode = (value: string) => {
    settingsStore.setLanguageMode(value)
}

import { Icon } from '@iconify/vue'
import { useColorMode } from '@vueuse/core'

const mode = useColorMode()
const changeTheme = () => {
    const activeMode = mode.value
    if (activeMode === "dark") {
        mode.value = "light"
    } else {
        mode.value = "dark"
    }
}

import { useI18n } from 'vue-i18n';
const { t } = useI18n()
</script>

<template>
    <div>
        <div class=" bg-slate-200 flex justify-end">
            <Sheet>
                <SheetTrigger as-child>
                    <Button class="px-1 m-3" size="icon">
                        <Settings />
                    </Button>
                </SheetTrigger>
                <SheetContent side="top">
                    <SheetTitle class=" border-b-4 border-slate-200">
                        <p class=" text-center pb-5">{{ t('header.sheet.title') }}</p>
                    </SheetTitle>
                    <SheetDescription>
                        <div class="flex justify-center my-3">
                            <div class="flex">
                                <Label class="text-2xl my-auto">{{ t('header.sheet.description.language') }}</Label>
                                <ArrowRight class="my-auto mx-3" />
                                <Select :default-value="languageMode" @update:model-value="changeLanguageMode">
                                    <SelectTrigger class="w-[100px] py-2 justify-betwen my-auto">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup v-for="(language, index) in avaibleLanguageModes" :key="index">
                                            <SelectItem :value="language">
                                                {{ language }}
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Separator class=" bg-black  w-12 my-auto mx-3 rotate-90 " />
                            <div class="flex">
                                <Label class="text-2xl my-auto">{{ t('header.sheet.description.theme') }}</Label>
                                <ArrowRight class="my-auto mx-3" />
                                <Button class="my-auto" variant="outline" @click="changeTheme">
                                    <Icon icon="radix-icons:moon"
                                        class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                    <Icon icon="radix-icons:sun"
                                        class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                </Button>
                            </div>
                        </div>
                    </SheetDescription>
                </SheetContent>
            </Sheet>
        </div>
    </div>
</template>