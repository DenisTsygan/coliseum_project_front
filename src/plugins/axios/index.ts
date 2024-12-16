import axios from "axios";
import type {  AxiosError, AxiosInstance } from "axios";
import { ERROR_CODE_BAD_REQUEST, ERROR_CODE_NETWORK, LS_KEY_A_TOKEN } from "@/utils/const";
import { useAuthStore } from "@/stores/auth.store";
import { refreshTokenRequest } from "./request/auth";


let baseUrl = import.meta.env.VITE_BACKEND_API_BASE_URL
let loginBaseUrl = baseUrl
if(!import.meta.env.PROD){
  baseUrl = import.meta.env.VITE_BACKEND_API_BASE_URL+"/api/data"
}else{
  baseUrl = "/api/data"
}

const $apiData = axios.create({
  baseURL: baseUrl ,
  withCredentials:true
});

$apiData.interceptors.request.use((config) => {
const authStore = useAuthStore()

  const access_token:string = authStore.getAccessToken()
  console.log(`Bearer ${access_token}`)
  config.headers.Authorization = `Bearer ${access_token}`;
  return config;
});
$apiData.interceptors.response.use(
  (config)=>{
    return config
  },
  async (error)=>{
    const originalRequest = error.config;
    console.log("api axios error nterceptors.response.use")
    console.log(error)
    if(error.response){//TODO refresh token not work in dev mode because first error shows ALLOW-ORIGEN Blocked CORS , why?
      if(error.response.status == 401 && error.config && !originalRequest._isRetry){
        originalRequest._isRetry = true
        console.log("Do refreshToken")
        const access_token  = await refreshTokenRequest()
        if(access_token){
            //const authStore = useAuthStore()
            //authStore.setAccessToken(access_token)
          console.log("Do retry originalRequest")
          originalRequest.headers.Authorization = `Bearer ${access_token}`
        }
        return await axios.request(originalRequest)
      }
    }else{
      localStorage.removeItem(LS_KEY_A_TOKEN)//error rfresh token when dev mode
      console.log("NO ERROR RESPONCE ")
    }
    console.log("AXIOS REJECT REQUEST")
    return Promise.reject(error)
  }
)

const $loginApi:AxiosInstance = axios.create({
  baseURL: loginBaseUrl ,
});
const $refreshTokenApi:AxiosInstance = axios.create({
  baseURL: loginBaseUrl ,
  withCredentials: true
});

export const $apiLogin = $loginApi

export const $RefreshTokenApi = $refreshTokenApi
  
export default $apiData;


export const parseErrorRequest = (err:AxiosError):string=>{

    switch(err.code){
        case ERROR_CODE_NETWORK:
            return "Server is not avaible"

        case ERROR_CODE_BAD_REQUEST:
            const responce  = err.response?.data +""
            const arr  =responce.split("at")
            const str = err.message + "|"+arr[0]
            return str
        default:
            return "No code message"
    }
}