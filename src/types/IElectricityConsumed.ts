export default interface IElectricityConsumedMounth{
    id:string,//uniq
    name:string,//uniq
    periodDate: string,// format mounth-year
    period: number,// hours количество отроботанных (когда записывали потребление) часов 
    allElectricyConsumed: number,// kW·h кВт·ч общее потребление за месяц клиента
    electricyConsumedDays : IElectricityConsumedDay[],
}
export interface IElectricityConsumedDay{
    id:string,//uniq
    periodDate:number// день месяца
    allElectricyConsumed: number,// kW·h кВт·ч общее потребление за день клиента
    electricyConsumedHours : number[],// array потребление за час из 24 елементов
}

/*export interface IElectricalParams{
    current: number,
    voltage:number,
    activePower:number,
    reactivePower:number,
    powerSupplyFrequency:number
}*/
