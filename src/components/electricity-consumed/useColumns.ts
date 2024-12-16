import { computed, h } from 'vue'
import type IElectricityConsumed from '@/types/data/IElectricityConsumed'
import { ColumnDef } from '@tanstack/vue-table'
import DataTableEditName from '@/components/electricity-consumed/data-table-edit-name.vue'
import DataTableShowDays from '@/components/electricity-consumed/data-table-show-days.vue'
import { useI18n } from 'vue-i18n'
import { Button } from '@/components/shadcn/ui/button'
import { ArrowDown } from 'lucide-vue-next'
export function useColumns(){
    const {t} = useI18n()
    const columnsComputed= computed(()=>{
        const columns: ColumnDef<IElectricityConsumed>[]  = [
            {
                accessorKey: 'name',
                header: () => h('div', { class: 'text-center' }, t("electricityConsumed.dialog-edit-name.label")),
                cell: ({ row }) => {
                    return h('div', { class: 'text-center font-medium ' }, row.getValue('name'))
                },
            },
            {
                accessorKey: 'period',
                header: () => h('div', { class: 'text-center' }, t("electricityConsumed.data-table.period")),
                cell: ({ row }) => {
                    return h('div', { class: 'text-center font-medium' }, row.getValue('period')+" "+t("unitsOfMeasurement.hours"))
                },
            },
            {
                accessorKey: 'allElectricyConsumed',
                header: ({ column }) => {
                    return h('div',{class:"flex justify-center"},h(Button, {
                        style:"mx-auto",
                        variant: 'ghost',
                        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
                    }, () => [t('electricityConsumed.column.allElectricityConsumed'), h(ArrowDown, { class: 'ml-2 h-4 w-4' })])) 
                },
                cell: ({ row }) => {
                    return h('div', { class: 'text-center font-medium' }, row.getValue('allElectricyConsumed')+" "+t("unitsOfMeasurement.electricityConsumed"))
                },
            },
            {
                id: 'days',
                header: () => h('div', { class: 'text-center' }, t('electricityConsumed.data-table.days')),
                cell: ({ row }) => {
                    const id = row.original.id
                    return h(DataTableShowDays, {
                        id,
                    })
                },
            },
            {
                id: 'edit',
                cell: ({ row }) => {
                    const id = row.original.id
                    return h(DataTableEditName, {
                        id,
                    })
                },
            },
        ]
        return columns
    }
        ) 
    return{
        columnsComputed
    }
}