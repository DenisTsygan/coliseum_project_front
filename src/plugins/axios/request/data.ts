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

export const excelDataRequest = async(periodDate:string):Promise<string>=>{
    try {
        var responce  = await $apiData.get("export-excel/"+periodDate,{
            responseType:"blob"
        })
        const url = window.URL.createObjectURL(new Blob([responce.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
            "download",
            `ElectricityData_${periodDate}.xlsx` // Имя файла
        );
        document.body.appendChild(link);
        link.click();

        // Удаление ссылки после скачивания
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        return ""
    } catch (error) {
        const err = error as AxiosError
        console.log(err)
        return parseErrorRequest(err)
    }

}

export const onecDataRequest = async(periodDate:string):Promise<string>=>{
    try {
        var responce  = await $apiData.get("export-onec/"+periodDate,{
            responseType:"blob" // Указываем, что сервер вернет бинарные данные
        })
        // Создаем объект Blob для файла
        const blob = new Blob([responce.data], { type: 'text/csv;charset=utf-8;' });

        // Генерируем ссылку для загрузки файла
        const downloadUrl = window.URL.createObjectURL(blob);

        // Создаем временную ссылку и эмулируем клик
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', `ElectricityData_${periodDate}.csv`);
        document.body.appendChild(link);
        link.click();

        // Удаляем временную ссылку
        link.remove();
        window.URL.revokeObjectURL(downloadUrl);
        return ""
    } catch (error) {
        const err = error as AxiosError
        console.log(err)
        return parseErrorRequest(err)
    }

}