
export default interface IPayloadAccessToken{
    userId: string,
    userName: string,
    email:string,
    roles: string //[]IRole
    exp:number
}