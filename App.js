import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, View } from "react-native";
import RootNavigator from "./src/navigation/RootNavigation";
import { store } from "./src/app/store";
import { bootstrapAuth, selectBootstrapped, selectUsername } from "./src/features/auth/authSlice";

function Bootstrapper() {
  const dispatch = useDispatch();
  // Obtenemos el estado de bootstrapped y username del store para decidir qué mostrar
  const bootstrapped = useSelector(selectBootstrapped);
  const username = useSelector(selectUsername);

  // Al montar el componente, lanzamos la acción bootstrapAuth para cargar el username guardado en el móvil (si lo hay) y actualizar el store
  useEffect(() => {
    dispatch(bootstrapAuth());
  }, [dispatch]);

  // Mientras no hemos comprobado si hay un usuario logueado o no, mostramos una pantalla de carga
  if (!bootstrapped) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  // Si ya hemos comprobado el estado de autenticación, mostramos la app (RootNavigator)
  //  o la pantalla de login dependiendo de si hay un usuario logueado o no
  return (
    <NavigationContainer>
      <RootNavigator isLoggedIn={!!username} />
    </NavigationContainer>
  );
}

// El componente App envuelve toda la aplicación en el Provider de Redux para que podamos acceder al store desde cualquier parte de la app
export default function App() {
  return (
    <Provider store={store}>
      <Bootstrapper />
    </Provider>
  );
}