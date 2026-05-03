import { redirect } from "react-router-dom";
import { signOutUser } from "../services/auth";

export default async function signOutAction(){
    try{
        await signOutUser()
        return redirect("/")
    }catch (error: any){
        console.log("Error")
        return
    }
}