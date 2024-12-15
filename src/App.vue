<script setup lang="ts">
import Header from '@/components/global/Header.vue';
import { onBeforeMount } from 'vue';
import { useSettingsStore } from '@/stores/settings.store';
import Toaster from './components/shadcn/ui/toast/Toaster.vue';

const settingsStore = useSettingsStore()
onBeforeMount(() => {
  settingsStore.initSettings()
})
</script>

<template>
  <Header></Header>
  <RouterView />
  <Toaster />
</template>

<style scoped></style>
