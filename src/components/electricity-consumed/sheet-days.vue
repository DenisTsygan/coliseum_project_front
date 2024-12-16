<script setup lang="ts">
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
} from '@/components/shadcn/ui/sheet'
import { Badge } from '@/components/shadcn/ui/badge'
import { BarChart } from '@/components/shadcn/ui/chart-bar';
import BarChartCustomToolip from '@/components/electricity-consumed/bar-chart-custom-toolip.vue';
import { ref, watch } from 'vue';
import { useDatastore } from '@/stores/data.store';
import { useI18n } from 'vue-i18n';
import { SEPARATOR_DATE } from '@/utils/const';
import { IElectricityConsumedDay } from '@/types/data/IElectricityConsumed';

const { t } = useI18n()
const dataStore = useDatastore()

const props = defineProps<{
    idSheetDays: string,
    periodMounth: string
}>()
const emits = defineEmits(["resetIdSheetDays"])

const data = ref<IElectricityConsumedDay[]>([])

const period = ref<string>("")
const nameById = ref<string>("")

const isOpenSheet = ref<boolean>(false)
const changeOpen = (value: boolean) => {
    isOpenSheet.value = value
    if (!value) {
        emits("resetIdSheetDays")
    }
}

watch(props, (value) => {
    if (value.idSheetDays) {
        const electricyConsumedDays = dataStore.getElectricyConsumedDaysById(value.idSheetDays)
        if (electricyConsumedDays) {
            period.value = " " + electricyConsumedDays[0].periodDate + SEPARATOR_DATE + props.periodMounth
                + " " + t("electricityConsumed.sheet-days.to") + " " + electricyConsumedDays[electricyConsumedDays.length - 1].periodDate + SEPARATOR_DATE + props.periodMounth
            data.value = electricyConsumedDays
            nameById.value = dataStore.getNameById(value.idSheetDays) + ""
            changeOpen(true)
        }
    }
})
</script>

<template>
    <Sheet :open="isOpenSheet" @update:open="changeOpen">
        <SheetContent side="bottom">
            <SheetTitle class=" border-b-4 border-slate-200">
                <p class=" text-center pb-5">
                    <Badge>{{ nameById }}</Badge>
                    {{ t("electricityConsumed.sheet-days.range") }}
                    {{ period }}
                </p>
            </SheetTitle>
            <SheetDescription>
                <div class="flex justify-center my-3">
                    <div class="my-3 px-3  w-1/2">
                        <BarChart :show-legend="false" :data="data" index="periodDate"
                            :categories="['allElectricyConsumed']" :y-formatter="(tick) => {
                                return typeof tick === 'number'
                                    ? `${tick} ${t('unitsOfMeasurement.electricityConsumed')}`
                                    : ''
                            }" :custom-tooltip="BarChartCustomToolip" />
                    </div>
                </div>
            </SheetDescription>
        </SheetContent>
    </Sheet>
</template>