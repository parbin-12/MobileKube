import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import axios from "axios";
import {useRouter} from "expo-router";

export default function CreateDeployment({ navigation }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [replicas, setReplicas] = useState("1");
  const router=useRouter();

  const createDeployment = async () => {
    try {
      const deploymentData = {
        name,
        image,
        replicas: Number(replicas),
      };

      await axios.post(
        "http://192.168.0.104:3000/api/deployments",
        deploymentData
      );

      Alert.alert("Success", "Deployment created successfully");

      setName("");
      setImage("");
      setReplicas("1");
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to create deployment"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Deployment</Text>

      <TextInput
        style={styles.input}
        placeholder="Deployment Name"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Docker Image"
        placeholderTextColor="#999"
        value={image}
        onChangeText={setImage}
      />

      <TextInput
        style={styles.input}
        placeholder="Replicas"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={replicas}
        onChangeText={setReplicas}
      />

      <Pressable style={styles.button} onPress={createDeployment}>
        <Text style={styles.buttonText}>Create Deployment</Text>
      </Pressable>

      {/* ✅ HOME BUTTON */}
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
    padding: 20,
  },

  title: {
    color: "#00A8E1",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 25,
    marginTop: 50,
  },

  input: {
    backgroundColor: "#102A43",
    color: "#E0F2FE",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#00A8E1",
  },

  button: {
    backgroundColor: "#00A8E1",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  homeButton: {
    backgroundColor: "#1F7A1F",
    padding: 12,
    borderRadius: 10,
    marginTop:40,
    alignItems: "center",
  },

  homeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});