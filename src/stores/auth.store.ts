import { defineStore } from "pinia"
import { ref } from "vue"

export const useAuthStore = defineStore('auth', () => {
    const isAuthUser = ref<boolean>()
    const getIsAuthUser = ()=>{
        return isAuthUser.value
    }

    const user = ref()
    const initIsAuthUser = async()=>{
      /*if(typeof isAuthUser.value === "undefined"){
        console.log("Do request vuefire getCurrentUser")
        const res = await getCurrentUser()
        if(res){
          isAuthUser.value = true
          user.value = res
        }else{
          isAuthUser.value  = false
        }
        return getIsAuthUser()
      }
      return getIsAuthUser()*/
        isAuthUser.value = false
        return false
    }
    const signIn  =(userData)=>{
        isAuthUser.value = true
        user.value = userData
    }
    const getUser =()=>{
        return user.value
    }
    const logout =()=>{
        user.value = undefined
        isAuthUser.value = false
    }
  
    return { getIsAuthUser,getUser ,logout,initIsAuthUser , signIn}
})