import IRole from "./IRole"


export default interface IUser{
    id: string,
    userName: string,
    email : string,
    roles : IRole[]
}
