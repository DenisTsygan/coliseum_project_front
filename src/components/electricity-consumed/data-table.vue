<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef } from '@tanstack/vue-table'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/shadcn/ui/table'
import { Label } from '@/components/shadcn/ui/label';
import {
    FlexRender,
    getCoreRowModel,
    useVueTable,
} from '@tanstack/vue-table'
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const props = defineProps<{
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    period: string
}>()

const table = useVueTable({
    get data() { return props.data },
    get columns() { return props.columns },
    getCoreRowModel: getCoreRowModel(),
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
</template>