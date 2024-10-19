<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { columns } from '@/components/electricity-consumed/columns';
import DataTable from '@/components/electricity-consumed/data-table.vue';
import DialogEditName from '@/components/electricity-consumed/dialog-edit-name.vue';
import SheetDays from '@/components/electricity-consumed/sheet-days.vue';
import { useDatastore } from '@/stores/data.store';

const dataStore = useDatastore()

const data = computed(() => dataStore.dataElectricityConsumed)
const dateOfData = computed(() => dataStore.dataElectricityConsumedPeriod)
onMounted(async () => {
    await dataStore.fetchDataCurrentMounth()
})

const idEditNameDialog = ref<string>("")
const openDialogEditNameById = (id: string) => {
    idEditNameDialog.value = id
}
const resetIdEditNameDialog = () => {
    idEditNameDialog.value = ""
}

const idSheetDays = ref<string>("")
const openSheetDaysById = (id: string) => {
    idSheetDays.value = id
}
const resetIdSheetDays = () => {
    idSheetDays.value = ""
}
</script>

<template>
    <div class="container py-10 mx-auto ">
        <DataTable :period="dateOfData" :columns="columns" :data="data" @open-dialog-edit-name="openDialogEditNameById"
            @open-sheet-days="openSheetDaysById" />
        <DialogEditName :id-edit-name-dialog="idEditNameDialog" @reset-id-edit-name-dialog="resetIdEditNameDialog" />
        <SheetDays :period-mounth="dateOfData" :id-sheet-days="idSheetDays" @reset-id-sheet-days="resetIdSheetDays" />
    </div>
</template>