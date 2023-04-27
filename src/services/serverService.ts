import { Signin } from "@/models/signin.model"
import  httpClient from "@/utils/httpClient"


type SignInProps = {
    username : string
    password : string
}

//Authentication


export const singIn = async (credential : SignInProps):Promise<Signin> => {
    const {data:respone} = await httpClient.post<Signin>('/auth',credential)
    return respone
}

export const singout = async ():Promise<void> =>{
    await httpClient.post('auth/logout',null)
}