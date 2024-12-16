export default interface IElectricityConsumedMounth{
    id:string,//uniq
    clientId: string
    name:string,//uniq
    //clintId -?будет ли информация о клиенте кроме имени (удалить name)
    periodDate: string,// format mounth-year
    period: number,// hours количество отроботанных (когда записывали потребление) часов 
    allElectricyConsumed: number,// kW·h кВт·ч общее потребление за месяц клиента
    //cost:number,//сума оплаты ? или вычислять при клике
    //losses: number; //? нужны ли Потери в кабельных трассах за месяц, кВт·ч
    electricyConsumedDays : IElectricityConsumedDay[],
}
export interface IElectricityConsumedDay{
    id:string,//uniq
    periodDate:number// день месяца
    allElectricyConsumed: number,// kW·h кВт·ч общее потребление за день клиента
    //losses: number; //? нужны ли Потери в кабельных трассах за месяц, кВт·ч
    electricyConsumedHours : number[],// array потребление за час из 24 елементов
}
const test:IElectricityConsumedDay = {
    id:"1",
    periodDate:1,
    allElectricyConsumed:1,
    electricyConsumedHours:[]
}
export const allElectricyConsumedKey = "allElectricyConsumed"
export const periodDateKey = "periodDate"
export const electricyConsumedHoursKey = "electricyConsumedHours"
export const IElectricityConsumedDayKeys = Object.keys(test)
/*export interface IElectricalParams{
    current: number,
    voltage:number,
    activePower:number,
    reactivePower:number,
    powerSupplyFrequency:number
}*/
