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
import { Download } from "lucide-vue-next"
import OneC from "@/components/icons/one-c.vue"
import Excel from "@/components/icons/excel.vue"
import { PROGRAM_EXCEL, PROGRAM_ONEC } from "@/utils/const"
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

//TODO realization exports 
const exportExcel = () => {
    console.log("🚀 ~ exportExcel ~ exportExcel:")
}
const exportOnec = () => {
    console.log("🚀 ~ exportOnec ~ exportOnec:")
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
        </DropdownMenuContent>
    </DropdownMenu>
</template>