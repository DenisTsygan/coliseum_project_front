import { refreshTokenRequest } from "@/plugins/axios/request/auth"
import IUser from "@/types/auth/IUser"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useAuthStore = defineStore('auth', () => {
    const isAuthUser = ref<boolean>()
    const getIsAuthUser = ()=>{
        return isAuthUser.value
    }
    const setIsAuthUser = (newValue:boolean)=>{
      isAuthUser.value = newValue
  }

    const accessToken = ref<string>('')
    const getAccessToken = ()=>{
      return accessToken.value
    }
    const setAccessToken = (token:string)=>{
      accessToken.value = token
    }

    const user = ref<IUser>()
    const setUser =(userInput:IUser)=>{
      console.log("store set user ")
      console.log(userInput)
      user.value = userInput
      setIsAuthUser(true)
    }
    const getUser =()=>{
      return user.value
    }
    const initIsAuthUser = async()=>{
      if(typeof isAuthUser.value === "undefined"){
        console.log("Do refreshTokenRequest")
        const res = await refreshTokenRequest()
        if(!res){
          setIsAuthUser(false)
        }
        return getIsAuthUser()
      }
      return getIsAuthUser()
    }
    const logout =()=>{
        user.value = undefined
        isAuthUser.value = false
    }
  
    return { getIsAuthUser,getUser,setUser ,logout,initIsAuthUser , 
      getAccessToken,setAccessToken }
})