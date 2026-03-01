import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

import { colors } from "../theme/colors";
import { selectUsername } from "../features/auth/authSlice";

export default function HomeScreen() {
  const username = useSelector(selectUsername);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido/a{username ? `, ${username}` : ""} 👋</Text>
      <Text style={styles.text}>
        Dentro sin volver a introducir el nombre.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 20, paddingTop: 60 },
  title: { fontSize: 26, fontWeight: "800", color: colors.text, marginBottom: 10 },
  text: { color: colors.muted, fontSize: 15, lineHeight: 20 },
});