// API URL
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// MAPTILER KEY
export const MAPTILER_API_KEY = import.meta.env.VITE_MAPTILER_API_KEY;

// Fonction "squelette" pour faire des requêtes à l'API
export async function request(path: string, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    credentials: "include", // Inclure les cookies dans la requête (authentification)
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  // Tenter de parser la réponse en JSON, ou retourner un objet vide si ça échoue
  const data = await res.json().catch(() => ({}));

  // Si la réponse n'est pas OK, on rejette la promesse avec un objet d'erreur
  if (!res.ok) {
    throw {
      message: data.message ?? "Request failed",
      statusText: res.statusText,
      status: res.status,
    };
  }
  return data;
}
