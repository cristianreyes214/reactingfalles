import React, { useMemo, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../theme/colors";
import { logout, saveUsername, selectUsername } from "../features/auth/authSlice";

export default function ProfileScreen() {
    const dispatch = useDispatch();
    const current = useSelector(selectUsername);
    const [username, setUsername] = useState(current ?? "");

    const canSave = useMemo(() => username.trim().length >= 2 && username.trim() !== (current ?? ""), [username, current]);

    const onSave = async () => {
        const clean = username.trim();
        if (clean.length < 2) {
            Alert.alert("Nombre inválido", "Introduce un nombre de usuario (mín. 2 caracteres).");
            return;
        }
        await dispatch(saveUsername(clean));
        Alert.alert("Guardado", "Nombre de usuario actualizado.");
    };

    const onLogout = async () => {
        await dispatch(logout());
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Perfil</Text>

            <Text style={styles.label}>Nombre de usuario</Text>
            <TextInput
                value={username}
                onChangeText={setUsername}
                style={styles.input}
                placeholder="Nombre de usuario"
                placeholderTextColor={colors.muted}
            />

            <TouchableOpacity
                onPress={onSave}
                style={[styles.button, !canSave && styles.buttonDisabled]}
                disabled={!canSave}
            >
                <Text style={styles.buttonText}>GUARDAR CAMBIO</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onLogout} style={[styles.button, styles.logoutButton]}>
                <Text style={styles.buttonText}>CAMBIAR DE USUARIO</Text>
            </TouchableOpacity>

            <Text style={styles.hint}>
                “Cambiar de usuario” borra el nombre guardado y te devuelve al login.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.bg, padding: 20, paddingTop: 60 },
    title: { fontSize: 26, fontWeight: "800", color: colors.text, marginBottom: 20 },
    label: { color: colors.muted, marginBottom: 8, fontWeight: "700" },
    input: {
        height: 46,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 10,
        paddingHorizontal: 14,
        marginBottom: 12,
        color: colors.text,
    },
    button: {
        height: 46,
        borderRadius: 10,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 6,
    },
    buttonDisabled: { opacity: 0.5 },
    logoutButton: { marginTop: 12 },
    buttonText: { color: "#fff", fontWeight: "800", letterSpacing: 0.8 },
    hint: { marginTop: 12, color: colors.muted, lineHeight: 18 },
});