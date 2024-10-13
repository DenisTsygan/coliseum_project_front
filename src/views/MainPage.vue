<script setup lang="ts">
import Button from '@/components/shadcn/ui/button/Button.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

</script>

<template>
    <h1>Main page {{ t("test.btn") }}</h1>
    <Button>{{ t("test.btn") }}</Button>

</template>