import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function MonumentsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monumentos</Text>
      <Text>Pantalla placeholder.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "800", marginBottom: 8 },
});