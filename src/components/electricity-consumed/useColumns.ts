import { computed, h } from 'vue'
import type IElectricityConsumed from '@/types/IElectricityConsumed'
import { ColumnDef } from '@tanstack/vue-table'
import DataTableEditName from '@/components/electricity-consumed/data-table-edit-name.vue'
import DataTableShowDays from '@/components/electricity-consumed/data-table-show-days.vue'
import { useI18n } from 'vue-i18n'

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
                header: () => h('div', { class: 'text-center' }, 'All electricy consumed'),
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