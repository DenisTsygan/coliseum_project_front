<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn/ui/card'
import { useDatastore } from '@/stores/data.store';
import { SEPARATOR_DATE } from '@/utils/const';
import { allElectricyConsumedKey, IElectricityConsumedDayKeys, periodDateKey } from '@/types/data/IElectricityConsumed';//electricyConsumedHoursKey
import { useI18n } from 'vue-i18n';
const { t } = useI18n()
console.log("custom tooltip before created ")

const dataStore = useDatastore()
const props = defineProps<{
    title?: string
    data: {
        name: string
        color: string
        value: any
    }[],

}>()

const ARR = IElectricityConsumedDayKeys.filter((el) => el !== periodDateKey)
const INDEX_ALL_ELECTRICITY_CONSUMED = ARR.findIndex((el) => el === allElectricyConsumedKey)
/*const INDEX_ELECTRICITY_CONSUMED_HOURS = ARR.findIndex((el) => el === electricyConsumedHoursKey)
console.log("props.data[INDEX_ELECTRICITY_CONSUMED_HOURS]")
console.log(props.data[INDEX_ELECTRICITY_CONSUMED_HOURS])*///TODO neded ?

</script>

<template>
    <Card class="text-sm">
        <CardHeader v-if="title" class="p-3 border-b">
            <CardTitle>
                {{ title }}{{ SEPARATOR_DATE }}{{ dataStore.dataElectricityConsumedPeriod }}
            </CardTitle>
        </CardHeader>
        <CardContent class="p-3 min-w-[100px] flex flex-col gap-1">
            <div class="flex justify-between">
                <div class="flex items-center">
                    <span class="w-2.5 h-2.5 mr-2">
                        <svg width="100%" height="100%" viewBox="0 0 30 30">
                            <path d=" M 15 15 m -14, 0 a 14,14 0 1,1 28,0 a 14,14 0 1,1 -28,0"
                                :stroke="props.data[INDEX_ALL_ELECTRICITY_CONSUMED].color"
                                :fill="props.data[INDEX_ALL_ELECTRICITY_CONSUMED].color" stroke-width="1" />
                        </svg>
                    </span>
                    <span>{{ t("electricityConsumed.bar-chart-custom-tooltip.text") }}</span><!---->
                </div>
                <span class="font-semibold ml-4">
                    {{ props.data[INDEX_ALL_ELECTRICITY_CONSUMED].value }}
                    {{ t("unitsOfMeasurement.electricityConsumed") }}<!---->
                </span>
            </div>
        </CardContent>
    </Card>
</template>