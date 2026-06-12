import { View, Text, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";

export default function Home() {
  return (
    <View style={styles.container}>


      <Text style={styles.logo}>🐳 MobileKube</Text>
      <Text style={styles.subtitle}>
        Docker / Kubernetes Control Center
      </Text>


      <View style={styles.grid}>

        <Pressable
          style={styles.card}
          onPress={() => router.push("/createDeploy")}
        >
          <Text style={styles.cardTitle}>📦 CreateDeployments</Text>
          <Text style={styles.cardDesc}>Manage containers & apps</Text>
        </Pressable>

        <Pressable
          style={styles.card}
          onPress={() => router.push("/deployment")}
        >
          <Text style={styles.cardTitle}>➕ Deployments List</Text>
          <Text style={styles.cardDesc}>Deploy Docker image</Text>
        </Pressable>

        <Pressable
          style={styles.card}
          onPress={() => router.push("/podDetail")}
        >
          <Text style={styles.cardTitle}>☸️ Pods</Text>
          <Text style={styles.cardDesc}>View running containers</Text>
        </Pressable>

      </View>
      <Text style={styles.footer}>
        Connected to Kubernetes Cluster ☸️
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
  },

  logo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "blue", // Docker blue
    textAlign: "center",
  },

  subtitle: {
    color: "purple",
    textAlign: "center",
    marginBottom: 30,
    fontSize: 13,
  },

  grid: {
    gap: 15,
  },

  card: {
    borderWidth: 1,
    borderColor: "#00A8E1",
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 12,
  },

  cardTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },

  cardDesc: {
    color: "#A9C7D9",
    marginTop: 4,
    fontSize: 13,
  },

  footer: {
    marginTop: 30,
    textAlign: "center",
    color: "#5FA8D3",
    fontSize: 12,
  },
});