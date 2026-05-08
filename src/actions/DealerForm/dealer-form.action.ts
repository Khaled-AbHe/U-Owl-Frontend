// actions/signIn.action.js
import { redirect } from "react-router-dom";
import type ActionReturnMessage from "../../interfaces/action-return.interface";

let response: ActionReturnMessage = {
  type: "success",
  message: "",
};

export async function dealerFormAction({ request }: any): Promise<ActionReturnMessage | Response> {
  // 1. On extrait les données du formulaire envoyé par le composant <Form>
  const formData = await request.formData();

  const creds = {
    fullName: formData.get("fullName"),
    businessName: formData.get("businessName"),
    yourEmail: formData.get("yourEmail"),
    businessEmail: formData.get("businessEmail"),
    phoneNumber: formData.get("phoneNumber"),
    city: formData.get("city"),
    postalCode: formData.get("postalCode"),
  };

  try {
    response["type"] = "success";
    response["message"] = "Application Received!";

    return response;
  } catch (error: any) {
    // 5. Échec : On "return" un message d'erreur au lieu de le "throw"
    // Ce message sera récupéré par le composant via useActionData()
    response["type"] = "error";
    response["message"] = "Sign In failed. Please try again.";

    if (error.status === 404 || error.status === 400) {
      response["message"] = "Email or password is incorrect. Please try again.";
    }
    return response;
  }
}
