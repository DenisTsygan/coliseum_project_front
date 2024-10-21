<script setup lang="ts" generic="TData">
import type { Table } from '@tanstack/vue-table'
import { Button } from '@/components/shadcn/ui/button'
import { Input } from '@/components/shadcn/ui/input'
import { X } from 'lucide-vue-next'
import DataExportDropdawn from "@/components/electricity-consumed/data-export-dropdawn.vue"
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
interface DataTableToolbarProps {
    table: Table<TData>
}

const props = defineProps<DataTableToolbarProps>()

const isFiltered = computed(() => props.table.getState().columnFilters.length > 0)
</script>

<template>
    <div class="flex items-center my-4 justify-between">
        <div class="flex flex-1 items-center space-x-2">
            <Input :placeholder="t('electricityConsumed.data-table-toolbar.filterPlaceHolder')"
                :model-value="(table.getColumn('name')?.getFilterValue() as string) ?? ''"
                class="h-8 w-[150px] lg:w-[250px]"
                @input="table.getColumn('name')?.setFilterValue($event.target.value)" />

            <Button v-if="isFiltered" variant="ghost" class="h-8 px-2 lg:px-3" @click="table.resetColumnFilters()">
                {{ t('electricityConsumed.data-table-toolbar.reset') }}
                <X class="ml-2 h-4 w-4" />
            </Button>
        </div>
        <DataExportDropdawn />
    </div>
</template>