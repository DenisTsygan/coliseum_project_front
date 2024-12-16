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
import Input from '../shadcn/ui/input/Input.vue';
import Button from '../shadcn/ui/button/Button.vue';
import { RefreshCcw } from 'lucide-vue-next';
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

const emits = defineEmits(["openDialogEditName", "openSheetDays", "changePeriod"])
const openDialog = (id: string) => {
    emits("openDialogEditName", id)
}
const openSheet = (id: string) => {
    emits("openSheetDays", id)
}

const currentPeriod = ref<string>()
const errorMsg = ref<string>()
const isPossiblePeriod = ref<boolean>(false)
const inputPeriod = ref<string>()

const onChangeInput = (value: string | number) => {
    if (!currentPeriod.value) {
        currentPeriod.value = props.period
    }
    isPossiblePeriod.value = checkIsPossiblePeriod(value + "")
}
const checkIsPossiblePeriod = (value: string) => {
    const periodRegex = /^(0[1-9]|1[0-2])-(\d{4})$/; // Регулярное выражение для формата mm-YYYY
    if (periodRegex.test(value)) {
        const [month, year] = value.split("-").map(Number); // Разделяем месяц и год
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;

        // Проверяем, чтобы дата не превышала текущий период
        if (year < currentYear || (year === currentYear && month <= currentMonth)) {
            // Проверяем, чтобы выбранный период не равнялся текущему
            if (value !== currentPeriod.value) {
                isPossiblePeriod.value = true;
                errorMsg.value = ""; // Сбрасываем сообщение об ошибке
                inputPeriod.value = value
                return true;
            } else {
                isPossiblePeriod.value = false;
                errorMsg.value = "";//You have already chosen this period!
                return false;
            }
        } else {
            isPossiblePeriod.value = false;
            errorMsg.value = t("electricityConsumed.data-table.errorPeriod.greater");
            return false;
        }
    } else {
        isPossiblePeriod.value = false;
        errorMsg.value = t("electricityConsumed.data-table.errorPeriod.format");
        return false;
    }
};


const periodRequest = () => {
    //clear state
    currentPeriod.value = ""
    errorMsg.value = ""
    isPossiblePeriod.value = false
    emits("changePeriod", inputPeriod.value)
}
</script>

<template>
    <div class="flex">
        <Label class=" text-xl my-auto mr-2">{{ t("electricityConsumed.data-table.period") }} : </Label>
        <Input class=" w-1/12 mr-3" :default-value="period" @update:model-value="onChangeInput" />
        <Button v-if="isPossiblePeriod" @click="periodRequest" size="icon">
            <RefreshCcw />
        </Button>
        <Label v-else class=" text-xl my-auto mr-2 text-red-700">{{ errorMsg }}</Label>
    </div>
    <Label v-if="currentPeriod" class=" text-xl my-auto mr-2">{{ t("electricityConsumed.data-table.currentPeriod") }} :
        {{ currentPeriod }}</Label>
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