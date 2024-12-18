<script lang="ts" setup>
import { Button } from '@/components/shadcn/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuShortcut
} from '@/components/shadcn/ui/dropdown-menu'
import Loader from '../global/Loader.vue'
import { Download } from "lucide-vue-next"
import OneC from "@/components/icons/one-c.vue"
import Excel from "@/components/icons/excel.vue"
import { PROGRAM_EXCEL, PROGRAM_ONEC } from "@/utils/const"
import { useI18n } from 'vue-i18n'
import { excelDataRequest, onecDataRequest } from '@/plugins/axios/request/data'
import { ref } from 'vue'
const { t } = useI18n()
import { useDatastore } from '@/stores/data.store'
const dataStore = useDatastore()
import { useToast } from '../shadcn/ui/toast'
const { toast } = useToast()


const isShowLoader = ref<boolean>(false)
const exportExcel = async () => {
    isShowLoader.value = true
    console.log("🚀 ~ exportExcel ~ exportExcel:")
    const res = await excelDataRequest(dataStore.getDataElectricityConsumedPeriod());
    if (res) {
        toast({
            title: t("toast.export.excel"),
            description: res
        })
    }
    isShowLoader.value = false
}
const exportOnec = async () => {
    isShowLoader.value = true
    console.log("🚀 ~ exportOnec ~ exportOnec:")
    const res = await onecDataRequest(dataStore.getDataElectricityConsumedPeriod());
    if (res) {
        toast({
            title: t("toast.export.onec"),
            description: res
        })
    }
    isShowLoader.value = false
}
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button class="px-1 m-3" size="icon">
                <Download />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56">
            <template v-if="!isShowLoader">
                <DropdownMenuLabel>
                    {{ t("electricityConsumed.data-export-dropdawn.label") }}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem @click="exportExcel">
                    <span>{{ PROGRAM_EXCEL }}</span>
                    <DropdownMenuShortcut>
                        <Excel class="w-10 h-10" />
                    </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem @click="exportOnec">
                    <span>{{ PROGRAM_ONEC }}</span>
                    <DropdownMenuShortcut>
                        <OneC class="w-10 h-10" />
                    </DropdownMenuShortcut>
                </DropdownMenuItem>
            </template>
            <Loader v-else />
        </DropdownMenuContent>
    </DropdownMenu>
</template>