import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clearStoredUsername, getStoredUsername, setStoredUsername } from "./authStorage";

// Devuelve el username guardado en el móvil, o null si no hay ninguno
// Cuando termina lanza automáticamente la acción fullfilled o rejected que actualiza el estado de autenticación en el store (bootstrapped y username)
export const bootstrapAuth = createAsyncThunk("auth/bootstrap", async () => {
  const username = await getStoredUsername();
  return { username };
});

// Guarda el username en el móvil y en el store
export const saveUsername = createAsyncThunk("auth/saveUsername", async (username) => {
  const clean = username.trim();
  await setStoredUsername(clean);
  return { username: clean };
});

// Borra el username guardado en el móvil y en el store
export const logout = createAsyncThunk("auth/logout", async () => {
  await clearStoredUsername();
  return {};
});

// Estado inicial de la autenticación. username es null si no hay ningún usuario logueado, o el nombre del usuario si lo hay.
// bootstrapped indica si ya hemos comprobado si hay un usuario logueado o no (para mostrar la pantalla de login o la app directamente).
const initialState = {
  username: null,
  bootstrapped: false,
};

// Se ejecuta cada vez que se lanza una acción relacionada con la autenticación (bootstrapAuth, saveUsername, logout)
// y actualiza el estado de autenticación en el store en consecuencia
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(bootstrapAuth.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.bootstrapped = true;
      })
      .addCase(bootstrapAuth.rejected, (state) => {
        state.bootstrapped = true;
      })
      .addCase(saveUsername.fulfilled, (state, action) => {
        state.username = action.payload.username;
      })
      .addCase(logout.fulfilled, (state) => {
        state.username = null;
      });
  },
});

export default authSlice.reducer;

export const selectUsername = (state) => state.auth.username;
export const selectBootstrapped = (state) => state.auth.bootstrapped;