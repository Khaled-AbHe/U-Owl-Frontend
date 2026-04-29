// actions/signIn.action.js
import { redirect } from "react-router-dom";
import { signInUser } from "../services/api";
import type { User } from "../interfaces/user.entity";

export async function signInAction({ request } : any) {
  // 1. On extrait les données du formulaire envoyé par le composant <Form>
  const formData = await request.formData();
  const creds = {
    email: formData.get('email'),    // Récupère la valeur de l'input name="email"
    userType: formData.get("type"),
    password: formData.get('password'), // Récupère la valeur de l'input name="password"
  };

  try {
    // 3. Appel au service API (NestJS)
    const user:User = await signInUser(creds)

    if (user.userType == "Client") {
      return redirect('/')
    } else if (user.adminType == "Super Admin") {
      return redirect('/superAdmin/dashboard')
    } else if (user.adminType == "Location Admin") {
      return redirect('/locationAdmin/dashboard')
    } 
    
    // 4. Succès : On redirige l'utilisateur vers sa destination
  } catch (error : any) {
    // 5. Échec : On "return" un message d'erreur au lieu de le "throw"
    // Ce message sera récupéré par le composant via useActionData()
    if (error.status === 404 || error.status === 400) {
      return "Email or password is incorrect. Please try again."
    }
    return "Sign In failed. Please try again."
  }
};