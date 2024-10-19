import IElectricityConsumed, { IElectricityConsumedDay } from "@/types/IElectricityConsumed"
import { defineStore } from "pinia"
import { ref } from "vue"

function getRandomNumber(min:number, max:number) {
    return (Math.random() * (max - min) + min).toFixed(2);
}
const generateDATA = (lengthMounth:number,periodDate:string[])=>{
    let arr:IElectricityConsumed[] = []
    for(let i=0;i<lengthMounth;i++){
        let arrDays:IElectricityConsumedDay[] = []
        for (let j = 0; j < 24; j++) {
            let arrHours = []
            for (let g = 0; g < 24; g++) {
                arrHours[g]= +getRandomNumber(10,100)
            }
            arrDays[j]= {
                id:"id_"+i+"_"+j,
                periodDate:j,
                allElectricyConsumed:+getRandomNumber(100,1000),
                electricyConsumedHours:arrHours
            }
        }

        let newElectricityConsumed:IElectricityConsumed = {
            id:"id_"+ i,
            name:"name_un_"+i,
            periodDate:periodDate[i],
            period: 512334,
            allElectricyConsumed: +getRandomNumber(10000, 1000000),
            electricyConsumedDays: arrDays
        }
        arr[i]=newElectricityConsumed
    }
    return arr
}
export const useDatastore = defineStore('data', () => {
    const dataElectricityConsumed = ref<IElectricityConsumed[]>([])
    const dataElectricityConsumedPeriod = ref<string>("")

    //TODO fetch data and loader
    const fetchDataCurrentMounth = async()=>{
        dataElectricityConsumedPeriod.value = "02-2024"
        dataElectricityConsumed.value = generateDATA(3,["02-2024","02-2024","02-2024"])
    }
    const getNameById = (id:string)=>{
        return dataElectricityConsumed.value.find((el)=>{
            return el.id === id
        })?.name
    }
    const getElectricyConsumedDaysById = (id:string)=>{
        return dataElectricityConsumed.value.find((el)=>{
            return el.id === id
        })?.electricyConsumedDays
    }
    const setNameById = (newName:string,prevName:string) => {
        const indexEdit = dataElectricityConsumed.value.findIndex((el)=>el.name === prevName)
        if(indexEdit!== -1){
            dataElectricityConsumed.value = dataElectricityConsumed.value.map((el,index)=>{
                if(index !==indexEdit){
                    return el
                }else{
                    return{...el,name:newName}
                }
            })
        }
       
    }

    
    return { dataElectricityConsumed,dataElectricityConsumedPeriod,
        getNameById,getElectricyConsumedDaysById,setNameById,
        fetchDataCurrentMounth
    }
})