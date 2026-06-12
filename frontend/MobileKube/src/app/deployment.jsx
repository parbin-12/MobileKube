import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator,Pressable } from "react-native";
import axios from "axios";
import {useRouter} from "expo-router";

export default function Deployments() {
  const [deployments, setDeployments] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchDeployments();
  }, []);

  const fetchDeployments = async () => {
    try {
      const response = await axios.get(
        "http://192.168.0.104:3000/api/deployments"
      );

      console.log("API Response:", response.data);

      setDeployments(response.data.deployments); 
    } catch (error) {
      console.log("Error fetching deployments:", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00A8E1" />
        <Text style={{ color: "white", marginTop: 10 }}>
          Loading Deployments...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📦 Deployments</Text>

      <FlatList
        data={deployments || []}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>

            <Text style={styles.text}>
              Replicas: {item.replicas}
            </Text>

            <Text style={styles.text}>
              Image: {item.image}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No Deployments Found
          </Text>
        }
      />

      <Pressable
              style={styles.homeButton}
             onPress={() => router.push("/")}
            >
              <Text style={styles.homeText}>🏠 Go Back</Text>
            </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1F33",
    padding: 15,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0B1F33",
  },

  title: {
    fontSize: 22,
    color: "#00A8E1",
    fontWeight: "bold",
    marginBottom: 15,
    marginTop: 60,
  },

  card: {
    backgroundColor: "#102A43",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#00A8E1",
  },

  name: {
    color: "#E0F2FE",
    fontSize: 16,
    fontWeight: "bold",
  },

  text: {
    color: "#A9C7D9",
    marginTop: 3,
  },

  empty: {
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
  homeButton: {
    backgroundColor: "#1F7A1F",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },

  homeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});