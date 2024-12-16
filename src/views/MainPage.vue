<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import DataTable from '@/components/electricity-consumed/data-table.vue';
import DialogEditName from '@/components/electricity-consumed/dialog-edit-name.vue';
import SheetDays from '@/components/electricity-consumed/sheet-days.vue';
import Loader from '@/components/global/Loader.vue';
import { useDatastore } from '@/stores/data.store';
import { useColumns } from '@/components/electricity-consumed/useColumns';
import { dataRequest } from '@/plugins/axios/request/data';
import { LS_KEY_DATA_PERIOD } from '@/utils/const';

const dataStore = useDatastore()
const { columnsComputed } = useColumns()
const data = computed(() => dataStore.dataElectricityConsumed)
const isShowLoader = ref<boolean>(true)
const dateOfData = computed(() => dataStore.dataElectricityConsumedPeriod)

const changePeriod = async (newPeriod: string) => {
    await fetchData(newPeriod)
}
const fetchData = async (periodFetch: string) => {
    isShowLoader.value = true
    const res = await dataRequest(periodFetch)
    if (typeof res === "string") {
        console.log("🚀 ~ Error ~ res:", res)
    } else {
        //const resTest = localStorage.getItem(LS_KEY_DATA_PERIOD)
        //console.log("HAHAHAHHA LS DATA NO DB")
        //console.log(JSON.parse(resTest + ""))

        //localStorage.setItem(LS_KEY_DATA_PERIOD, JSON.stringify(res))
        res.forEach(el => {
            el.electricyConsumedDays.sort((a, b) => (a.periodDate - b.periodDate))
        })
        dataStore.setDataCurrentMounth(periodFetch, res);
        isShowLoader.value = false
    }
}
onMounted(async () => {
    const now = new Date()
    const periodDate = (now.getMonth() + 1) + "-" + now.getFullYear()
    console.log("🚀 ~ onMounted ~ periodDate:", periodDate)
    await fetchData(periodDate)
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
        <DataTable v-if="!isShowLoader" :period="dateOfData" :columns="columnsComputed" :data="data"
            @open-dialog-edit-name="openDialogEditNameById" @open-sheet-days="openSheetDaysById"
            @change-period="changePeriod" />
        <Loader v-else />
        <DialogEditName :id-edit-name-dialog="idEditNameDialog" @reset-id-edit-name-dialog="resetIdEditNameDialog" />
        <SheetDays :period-mounth="dateOfData" :id-sheet-days="idSheetDays" @reset-id-sheet-days="resetIdSheetDays" />
    </div>
</template>