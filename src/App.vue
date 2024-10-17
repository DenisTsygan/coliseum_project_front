<script setup lang="ts">
import Header from '@/components/global/Header.vue';
import { onBeforeMount } from 'vue';
import { useSettingsStore } from '@/stores/settings.store';

const settingsStore = useSettingsStore()
onBeforeMount(() => {
  settingsStore.initSettings()
})
</script>

<template>
  <Header></Header>
  <RouterView />
</template>

<style scoped></style>
