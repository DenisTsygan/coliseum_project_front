import IPermission from "./IPermission";

export default interface IRole{
    Id: number,
    Name: string,
    Permissions : IPermission[],
}