<script setup lang="ts">
import Separator from '../shadcn/ui/separator/Separator.vue';
import Label from '../shadcn/ui/label/Label.vue';
import Button from '../shadcn/ui/button/Button.vue';
import { useI18n } from 'vue-i18n';
import { User, ArrowDown } from "lucide-vue-next"
import { useAuthStore } from '@/stores/auth.store';
import { useToast } from '../shadcn/ui/toast';

const { toast } = useToast()
const authStore = useAuthStore()
const { t } = useI18n()
import { logoutRequest, logoutAllSessionsRequest } from '@/plugins/axios/request/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()

const isDisabledaAction = ref<boolean>(false)
const goToMainPage = () => {
    router.push({ name: 'Auth' })
}

const logout = async () => {
    isDisabledaAction.value = true
    const res = await logoutRequest()
    isDisabledaAction.value = false
    if (res) {
        toast({
            title: t("toast.logout"),
            description: res
        })
    } else {
        goToMainPage()
    }
}
const logoutAll = async () => {
    isDisabledaAction.value = true
    const res = await logoutAllSessionsRequest()
    isDisabledaAction.value = false
    if (res) {
        toast({
            title: t("toast.logoutAll"),
            description: res
        })
    } else {
        goToMainPage()
    }
}
</script>

<template>
    <div>
        <div class=" flex justify-center ">
            <User class="my-auto" />
            <Label class=" text-2xl ">{{ t('userInfo.label') }}</Label>
        </div>
        <div class=" flex justify-center ">
            <ArrowDown class=" flex justify-center my-auto mx-3" />
        </div>
        <div class=" flex justify-center ">
            <p class=" font-bold text-xl mr-3">{{ t("userInfo.email") }}:</p>
            <p class=" font-bold text-xl text-black">{{ authStore.getUser()?.email }}</p>
        </div>
        <div class=" flex justify-center ">
            <p class=" font-bold text-xl mr-3">{{ t("userInfo.userName") }}:</p>
            <p class=" font-bold text-xl text-black">{{ authStore.getUser()?.userName }}</p>
        </div>
        <div class=" flex justify-center mb-2">
            <p class=" font-bold text-xl mr-3">{{ t("userInfo.roles") }}:</p>
            <p class=" font-bold text-xl text-black">
                <template v-for="(role, index) in authStore.getUser()?.roles" :key="role.Id">
                    {{ ((index + 1) % 2 !== 0) ? role.Name : "," + role.Name }}
                </template>
            </p>
        </div>
        <Separator class=" bg-black " />
        <div class=" flex justify-center my-2">
            <Button :disabled="isDisabledaAction" @click="logout" class="mx-auto" variant="destructive">{{
                t("userInfo.logout")
                }}</Button>
        </div>
        <div class=" flex justify-center ">
            <Button :disabled="isDisabledaAction" @click="logoutAll" class="mx-auto" variant="destructive">{{
                t("userInfo.logoutAll") }}</Button>
        </div>
    </div>
</template>