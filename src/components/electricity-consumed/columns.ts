import { h } from 'vue'
import type IElectricityConsumed from '@/types/IElectricityConsumed'
import { ColumnDef } from '@tanstack/vue-table'
import DataTableEditName from '@/components/electricity-consumed/data-table-edit-name.vue'
import DataTableShowDays from '@/components/electricity-consumed/data-table-show-days.vue'

export const columns: ColumnDef<IElectricityConsumed>[] = [
    {
        accessorKey: 'name',
        header: () => h('div', { class: 'text-center' }, 'Name'),
        cell: ({ row }) => {
            return h('div', { class: 'text-center font-medium ' }, row.getValue('name'))
        },
    },
    {
        accessorKey: 'period',
        header: () => h('div', { class: 'text-center' }, 'Period'),
        cell: ({ row }) => {
            return h('div', { class: 'text-center font-medium' }, row.getValue('period')+" hours")
        },
    },
    {
        accessorKey: 'allElectricyConsumed',
        header: () => h('div', { class: 'text-center' }, 'All electricy consumed'),
        cell: ({ row }) => {
            return h('div', { class: 'text-center font-medium' }, row.getValue('allElectricyConsumed')+" kW*h")
        },
    },
    {
        id: 'days',
        header: () => h('div', { class: 'text-center' }, 'Days'),
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