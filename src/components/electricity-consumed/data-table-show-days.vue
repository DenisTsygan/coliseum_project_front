<script setup lang="ts">
import { Button } from '@/components/shadcn/ui/button';
import { MoreHorizontal } from 'lucide-vue-next';
const props = defineProps<{
    id: string
}>()
const emits = defineEmits(["openSheet"])
const openSheet = () => {
    emits("openSheet", props.id)
}

</script>

<template>
    <div class="flex justify-center">
        <Button variant="secondary" class="w-8 h-8 p-0 mx-auto" @click="openSheet">
            <MoreHorizontal class="w-4 h-4" />
        </Button>
    </div>
</template>