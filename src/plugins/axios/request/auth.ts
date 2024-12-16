import { $apiLogin, $RefreshTokenApi, parseErrorRequest } from "@/plugins/axios/index"
import IResponceLogin from "@/types/auth/IResponceLogin"
import { useAuthStore } from "@/stores/auth.store"
import { FINGERPRINT, LS_KEY_A_TOKEN } from "@/utils/const"
import { AxiosError } from "axios"
import { decodeToken } from "@/utils/jwt"
import IPayloadAccessToken from "@/types/jwt/IPayloadAccessToken"
import IUser from "@/types/auth/IUser"

const getUserFromAccessToken = (access_token:string)=>{
    const accessTokenPayloadStr = decodeToken(access_token)
    const accessTokenPayload:IPayloadAccessToken = JSON.parse(accessTokenPayloadStr)
    const user:IUser ={
        id:accessTokenPayload.userId,
        email:accessTokenPayload.email,
        userName:accessTokenPayload.userName,
        roles:JSON.parse(accessTokenPayload.roles)
    }
    return user 
}
const setDataAuthStore = (access_token:string)=>{
    if(import.meta.env.DEV){
        localStorage.setItem(LS_KEY_A_TOKEN , access_token)
    }
    const authStore = useAuthStore()

    authStore.setAccessToken(access_token)
    const user = getUserFromAccessToken(access_token)
    authStore.setUser(user)
}
export const loginRequest = async(email:string, password:string, fingerprint:string):Promise<string>=>{
    try {
        var responce  = await $apiLogin.post("login",{
            email:email,
            password:password,
            fingerPrint:fingerprint
        })
        let tokens = responce.data as IResponceLogin
        setDataAuthStore(tokens.accessToken)
        return ""
    } catch (error) {
        const err = error as AxiosError
        console.log(err)
        return parseErrorRequest(err)
    }

}

export const refreshTokenRequest = async ():Promise<string>=>{
    if(import.meta.env.DEV){
        return new Promise((resolve)=>{
            const access_token = localStorage.getItem(LS_KEY_A_TOKEN)
            if(access_token){
                setDataAuthStore(access_token)
                resolve(access_token)
            }else{
                resolve("")
            }
        })
    }else{
        return new Promise((resolve)=>{
            $RefreshTokenApi.post("refreshtoken",{fingerPrint:FINGERPRINT}).then(function (response) {
               const tokens = response.data as IResponceLogin
              setDataAuthStore(tokens.accessToken)
               resolve(tokens.accessToken)
            }).catch(()=>{
              resolve("")
            });
          })
    }
  }

export const logoutRequest = async():Promise<string>=>{
    const authStore = useAuthStore()
    try {
        var responce  = await $apiLogin.post("logout")
        authStore.logout()
        console.log(responce.data)
        return ""
    } catch (error) {
        const err = error as AxiosError
        console.log(err)
        return parseErrorRequest(err)
    }
}

export const logoutAllSessionsRequest = async():Promise<string | undefined>=>{
    const authStore = useAuthStore()
    try {
        var responce  = await $apiLogin.post("logoutall")
        authStore.logout()
        console.log(responce.data)
        return ""
    } catch (error) {
        const err = error as AxiosError
        console.log(err)
        return parseErrorRequest(err)
    }
}