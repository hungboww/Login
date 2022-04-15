interface UserArr{
    data:Array<IUser>
}
 export interface IUser{
    id?:string;
    name:string,
    password:string,
    email:string
}
export interface ILogin{
    name:string,
    password:string
}