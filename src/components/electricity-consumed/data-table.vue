<script setup lang="ts" generic="TData, TValue">
//TODO switch generic
import type { ColumnDef, ColumnFiltersState, SortingState } from '@tanstack/vue-table'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/shadcn/ui/table'
import { Label } from '@/components/shadcn/ui/label';
import DataTablePagination from '@/components/electricity-consumed/data-table-pagination.vue';
import DataTableToolbar from '@/components/electricity-consumed/data-table-toolbar.vue';
import {
    FlexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useVueTable,
} from '@tanstack/vue-table'
import { useI18n } from 'vue-i18n';
import { valueUpdater } from '@/utils/shadcn';
import { ref } from 'vue';

const { t } = useI18n()

const props = defineProps<{
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    period: string
}>()

const columnFilters = ref<ColumnFiltersState>([])
const sorting = ref<SortingState>([])

const table = useVueTable({
    get data() { return props.data },
    get columns() { return props.columns },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
    state: {
        get columnFilters() { return columnFilters.value },
        get sorting() { return sorting.value },
    },
})

const emits = defineEmits(["openDialogEditName", "openSheetDays"])
const openDialog = (id: string) => {
    emits("openDialogEditName", id)
}
const openSheet = (id: string) => {
    emits("openSheetDays", id)
}

</script>

<template>
    <Label class=" text-xl ">{{ t("electricityConsumed.data-table.period") }} : {{ period }}</Label>
    <DataTableToolbar :table="table" />
    <div class="border rounded-md ">
        <Table>
            <TableHeader>
                <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                    <TableHead v-for="header in headerGroup.headers" :key="header.id">
                        <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                            :props="header.getContext()" />
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <template v-if="table.getRowModel().rows?.length">
                    <TableRow v-for="row in table.getRowModel().rows" :key="row.id"
                        :data-state="row.getIsSelected() ? 'selected' : undefined">
                        <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                            <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()"
                                @openDialog="openDialog" @openSheet="openSheet" />
                        </TableCell>
                    </TableRow>
                </template>
                <template v-else>
                    <TableRow>
                        <TableCell :colspan="columns.length" class="h-24 text-center">
                            {{ t("electricityConsumed.data-table.noResults") }}<!--TODO show spiner-->
                        </TableCell>
                    </TableRow>
                </template>
            </TableBody>
        </Table>
    </div>
    <DataTablePagination :table="table" />
</template>