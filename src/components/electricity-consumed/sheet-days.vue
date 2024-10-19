<script setup lang="ts">
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
} from '@/components/shadcn/ui/sheet'
import { VisStackedBar, VisXYContainer, VisAxis } from '@unovis/vue'
import { ref, watch } from 'vue';
import { useDatastore } from '@/stores/data.store';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const dataStore = useDatastore()

const props = defineProps<{
    idSheetDays: string,
    periodMounth: string
}>()
const emits = defineEmits(["resetIdSheetDays"])

const data = ref<number[]>([])
const period = ref<string>("")

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
            period.value = " " + electricyConsumedDays[0].periodDate + " day to " + electricyConsumedDays[electricyConsumedDays.length - 1].periodDate + " day"//TODO formating text
            data.value = electricyConsumedDays.flatMap(el => el.allElectricyConsumed)
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
                    {{ t("electricityConsumed.sheet-days.range") }}
                    {{ period }}
                    {{ t("electricityConsumed.sheet-days.of") }}
                    {{ periodMounth }}
                </p>
            </SheetTitle>
            <SheetDescription>
                <div class="flex justify-center my-3">
                    <div class="my-3 px-3 h-[220px]">
                        <VisXYContainer :data="data" class="h-[220px]" :style="{
                            'opacity': 0.9,
                            '--theme-primary': `hsl(var(--foreground))`,
                        }">
                            <VisStackedBar :x="(d: Array<number>, i: number) => i" :y="(d: Array<number>) => d"
                                color="var(--theme-primary)" :bar-padding="0.1" :rounded-corners="0" />
                            <VisAxis type="x" />
                            <VisAxis type="y" />
                        </VisXYContainer>
                    </div>
                </div>
            </SheetDescription>
        </SheetContent>
    </Sheet>
</template>