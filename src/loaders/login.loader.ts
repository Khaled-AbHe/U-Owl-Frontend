import { redirect } from "react-router-dom";
import { getCurrentUser } from "../services/api";

export default async function signInLoader(){
    try{
        await getCurrentUser()
        return redirect("/home")
    } catch (error){
        return
    }
}