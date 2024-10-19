<script setup lang="ts">
import { Button } from '@/components/shadcn/ui/button';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const props = defineProps<{
    id: string
}>()
const emits = defineEmits(["openDialog"])
const openDialog = () => {
    emits("openDialog", props.id)
}

</script>

<template>
    <div class="flex justify-center">
        <Button class=" " variant="outline" @click="openDialog">
            {{ t("electricityConsumed.data-table-edit-name.btn") }}
        </Button>
    </div>
</template>