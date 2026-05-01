import { redirect } from "react-router-dom";
import { getCurrentUser } from "../services/auth";

export default async function signInLoader(){
    try{
        await getCurrentUser()
        return redirect("/")
    } catch (error){
        return
    }
}