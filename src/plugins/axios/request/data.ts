import IElectricityConsumedMounth from "@/types/data/IElectricityConsumed"
import $apiData, { parseErrorRequest } from ".."
import { AxiosError } from "axios"

export const dataRequest = async(periodDate:string):Promise<IElectricityConsumedMounth[]|string>=>{
    try {
        var responce  = await $apiData.get("get/"+periodDate)
        let data = responce.data as IElectricityConsumedMounth[]
        console.log("🚀 ~ getData ~ data:", data)
        console.log(data)
        return data
    } catch (error) {
        const err = error as AxiosError
        console.log(err)
        return parseErrorRequest(err)
    }

}

export const renameRequest = async(newName:string, ecmId:string):Promise<string>=>{
    try {
        var responce  = await $apiData.post("name",{
            newName:newName,
            ecmId:ecmId,
        })
        console.log(responce.data)
        return ""
    } catch (error) {
        const err = error as AxiosError
        console.log(err)
        return parseErrorRequest(err)
    }

}