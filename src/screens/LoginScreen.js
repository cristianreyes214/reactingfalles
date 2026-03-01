import React, { useMemo, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { saveUsername } from "../features/auth/authSlice";
import { colors } from "../theme/colors";


export default function LoginScreen() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");

  const canSubmit = useMemo(() => username.trim().length >= 2, [username]);

  const onSubmit = async () => {
    const clean = username.trim();
    if (clean.length < 2) {
      Alert.alert("Nombre inválido", "Introduce un nombre de usuario (mín. 2 caracteres).");
      return;
    }
    await dispatch(saveUsername(clean));
    // el cambio de estado hará que el RootNavigator pase a la app automáticamente
  };

  return (
    <View style={styles.container}>
      <Text style={styles.brand}>ReactingFalles</Text>

      <Text style={styles.subtitle}>
        Introduce tu nombre de usuario{"\n"}para iniciar sesión
      </Text>

      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Nombre de usuario"
        placeholderTextColor={colors.muted}
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="done"
        onSubmitEditing={onSubmit}
      />

      <TouchableOpacity
        onPress={onSubmit}
        activeOpacity={0.85}
        style={[styles.button, !canSubmit && styles.buttonDisabled]}
        disabled={!canSubmit}
      >
        <Text style={styles.buttonText}>INICIAR SESIÓN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    marginBottom: 200,
  },
  brand: {
    fontSize: 34,
    fontWeight: "800",
    color: colors.primary,
    marginBottom: 90,
    letterSpacing: 0.4,
  },
  subtitle: {
    textAlign: "center",
    color: colors.text,
    marginBottom: 18,
    fontWeight: "600",
  },
  input: {
    width: "100%",
    height: 46,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    marginBottom: 12,
    color: colors.text,
  },
  button: {
    width: "100%",
    height: 46,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "800",
    letterSpacing: 0.8,
  },
});