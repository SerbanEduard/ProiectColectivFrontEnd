import { useAuthStore } from "@/services/stores/useAuthStore";
import { jwtDecode } from "jwt-decode";

export function isTokenValid(token : any) {
  if (!token) return false;
  try {
    const decoded = jwtDecode(token);
    if(!decoded.exp) return false;

    // exp is in seconds, Date.now() is in ms
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false; // invalid token format
  }
}

export const getStoredToken = () => {
  const authStore = useAuthStore.getState();
  if (authStore.token) return authStore.token;
  else try { 
    const token = localStorage.getItem('auth_token');
    if (token) {
      authStore.setToken(token);
      return token;
    }
    return undefined; 
  } 
    catch { return undefined; }
};