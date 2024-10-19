<script setup lang="ts">
import Button from '@/components/shadcn/ui/button/Button.vue';
import Input from '@/components/shadcn/ui/input/Input.vue';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/shadcn/ui/card'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/shadcn/ui/form'
import Loader from '@/components/global/Loader.vue';

import { ref, computed } from 'vue';

import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'

import { useI18n } from 'vue-i18n';
const { t } = useI18n()

const FORM_EMAIL_MIN_SYMBOLS = 10
const FORM_EMAIL_MAX_SYMBOLS = 50
const FORM_PASSWORD_MIN_SYMBOLS = 8
const FORM_EMAIL_ERROR = "email"
const FORM_EMAIL_OPTIONS = "@a.a"

const formSchema = computed(() => toTypedSchema(zod.object({
    email: zod.string()
        .email({
            message: t("form.validate." + FORM_EMAIL_ERROR, { a: FORM_EMAIL_OPTIONS })
        })
        .min(FORM_EMAIL_MIN_SYMBOLS, {
            message: t("form.validate." + FORM_MINLENGTH_ERROR, { count: FORM_EMAIL_MIN_SYMBOLS })
        })
        .max(FORM_EMAIL_MAX_SYMBOLS, {
            message: t("form.validate." + FORM_MAXLENGTH_ERROR, { count: FORM_EMAIL_MAX_SYMBOLS })
        }),
    password: zod.string()
        .min(FORM_PASSWORD_MIN_SYMBOLS, {
            message: t("form.validate." + FORM_MINLENGTH_ERROR, { count: FORM_PASSWORD_MIN_SYMBOLS })
        }),
})))

const { handleSubmit, isFieldDirty } = useForm({//
    validationSchema: formSchema,
})

const isBtnDisabled = computed(() => !(isFieldDirty("email") && isFieldDirty("password")))


import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import { FORM_MAXLENGTH_ERROR, FORM_MINLENGTH_ERROR } from '@/utils/const';

const authStore = useAuthStore()
const router = useRouter()


const isActionLoginProcessing = ref<boolean>(false)
const errorMsgActionLoginProcessing = ref<string>('')
const goToMainPage = () => {
    router.push({ name: 'Main' })
}


const onSubmit = handleSubmit((values) => {
    console.log("🚀 ~ onSubmit ~ values:", values)
    isActionLoginProcessing.value = true
    //TODO request to backend
    /*signInWithEmailAndPassword(auth, values.email, values.password).then((userCredentional) => {
        console.log("success logined")
        authStore.signIn(userCredentional.user)
        goToMainPage()
    }).catch((msg: string) => {
        errorMsgActionLoginProcessing.value = parseErrorMsg(msg + "").msg
    }).finally(() => {
        isActionLoginProcessing.value = false
    })*/
})

</script>

<template>
    <div class="w-[400px] mx-auto">
        <Card>
            <CardHeader>
                <CardTitle>{{ t('signIn.cardTitke') }}</CardTitle>
            </CardHeader>
            <CardContent class="space-y-2" v-if="!isActionLoginProcessing">
                <div class="flex justify-center bg-slate-100 px-4 py-2 rounded-lg" v-if="errorMsgActionLoginProcessing">
                    <h1 class=" font-bold text-red-600">{{ errorMsgActionLoginProcessing }}</h1>
                </div>
                <form class="w-full space-y-6" @submit="onSubmit">
                    <FormField v-slot="{ componentField }" name="email" :validate-on-blur="!isFieldDirty">
                        <FormItem>
                            <FormLabel>{{ t('signIn.labelEmail') }}</FormLabel>
                            <FormControl>
                                <Input type="text" :placeholder="t('signIn.placeholderEmail')" v-bind="componentField"
                                    autocomplete="email" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ componentField }" name="password" :validate-on-blur="!isFieldDirty">
                        <FormItem>
                            <FormLabel>{{ t('signIn.labelPassword') }}</FormLabel>
                            <FormControl>
                                <Input type="password" :placeholder="t('signIn.placeholderPassword')"
                                    v-bind="componentField" autocomplete="current-password" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <div class="flex justify-end">
                        <Button type="submit" :disabled="isBtnDisabled">
                            {{ t('signIn.btn') }}
                        </Button>
                    </div>
                </form>
            </CardContent>
            <CardContent v-else class="space-y-2">
                <Loader />
            </CardContent>
        </Card>
    </div>
</template>