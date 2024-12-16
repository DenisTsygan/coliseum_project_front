<script setup lang="ts">
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/shadcn/ui/dialog'
import { Button } from '@/components/shadcn/ui/button';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/shadcn/ui/form'
import Loader from '../global/Loader.vue';
import { Input } from '@/components/shadcn/ui/input'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
import { computed, ref, watch } from 'vue';
import { useForm } from 'vee-validate';
import { useI18n } from 'vue-i18n';
import { FORM_MAXLENGTH_ERROR, FORM_MINLENGTH_ERROR } from '@/utils/const';
import { useDatastore } from '@/stores/data.store';
import { renameRequest } from '@/plugins/axios/request/data';
import { useToast } from '../shadcn/ui/toast';

const { toast } = useToast()
const dataStore = useDatastore()
const { t } = useI18n()

const FORM_NAME_MIN_SYMBOLS = 2
const FORM_NAME_MAX_SYMBOLS = 50

const formSchema = computed(() => toTypedSchema(zod.object({
    name: zod.string()
        .min(FORM_NAME_MIN_SYMBOLS, {
            message: t("form.validate." + FORM_MINLENGTH_ERROR, { count: FORM_NAME_MIN_SYMBOLS })
        })
        .max(FORM_NAME_MAX_SYMBOLS, {
            message: t("form.validate." + FORM_MAXLENGTH_ERROR, { count: FORM_NAME_MAX_SYMBOLS })
        }),
})))

const { handleSubmit, setFieldValue } = useForm({
    validationSchema: formSchema,
})

const props = defineProps<{
    idEditNameDialog: string
}>()
const emits = defineEmits(["resetIdEditNameDialog"])


const initName = ref<string>("")
watch(props, (value) => {
    if (value.idEditNameDialog) {
        const name = dataStore.getNameById(value.idEditNameDialog)
        setFieldValue("name", name)
        initName.value = name + ""
        isOpenDialog.value = true
    }
})

const isOpenDialog = ref<boolean>(false)
const changeOpen = (value: boolean) => {
    isOpenDialog.value = value
    if (!value) {
        emits("resetIdEditNameDialog")
    }
}

const isShowLoader = ref<boolean>(false)
const onSubmit = handleSubmit(async (values) => {
    if (values.name !== initName.value) {
        isShowLoader.value = true
        const res = await renameRequest(values.name, props.idEditNameDialog)
        if (res) {
            toast({
                title: t("toast.rename"),
                description: res
            })
        } else {
            dataStore.setNameById(values.name, props.idEditNameDialog)
            changeOpen(false)
        }
        isShowLoader.value = false
    } else {
        toast({
            title: t("toast.rename"),
            description: t("electricityConsumed.dialog-edit-name.error.noChanges")
        })
    }
})
</script>

<template>
    <Dialog @update:open="changeOpen" :open="isOpenDialog">
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>{{ t("electricityConsumed.data-table-edit-name.btn") }}</DialogTitle>
                <DialogDescription>
                    {{ t("electricityConsumed.dialog-edit-name.description") }}
                </DialogDescription>
            </DialogHeader>
            <form @submit="onSubmit" v-if="!isShowLoader">
                <FormField v-slot="{ componentField }" name="name">
                    <FormItem>
                        <FormLabel>{{ t("electricityConsumed.dialog-edit-name.label") }}</FormLabel>
                        <FormControl>
                            <Input type="text" :placeholder="t('electricityConsumed.dialog-edit-name.placeholder')"
                                v-bind="componentField" />
                        </FormControl>
                        <FormDescription>
                            {{ t("electricityConsumed.dialog-edit-name.labelDescrition") }}
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <DialogFooter>
                    <Button type="submit">
                        {{ t("electricityConsumed.dialog-edit-name.submit") }}
                    </Button>
                </DialogFooter>
            </form>
            <Loader v-else />
        </DialogContent>
    </Dialog>
</template>