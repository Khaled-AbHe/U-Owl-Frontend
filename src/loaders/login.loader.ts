import { redirect } from "react-router-dom";
import { getCurrentUser } from "../services/api";

export default async function loginLoader(){
    try{
        const user = await getCurrentUser()
        return redirect("/host")
    } catch (error){
        return
    }
}