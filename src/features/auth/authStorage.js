import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "rf_username";

// Lee el username del movil
export async function getStoredUsername() {
  try {
    const value = await AsyncStorage.getItem(KEY);
    return value && value.trim().length ? value : null;
  } catch {
    return null;
  }
}

// Guarda el username en el móvil
export async function setStoredUsername(username) {
  try {
    await AsyncStorage.setItem(KEY, username);
  } catch {
    // si falla, no bloqueamos la app
  }
}

// Borra el username guardado en el móvil
export async function clearStoredUsername() {
  try {
    await AsyncStorage.removeItem(KEY);
  } catch {}
}