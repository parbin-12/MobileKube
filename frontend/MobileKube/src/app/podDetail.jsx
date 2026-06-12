import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import {useRouter} from "expo-router";


export default function Pods({ navigation }) {
  const [pods, setPods] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchPods();
  }, []);

  const fetchPods = async () => {
    try {
      const response = await axios.get(
        "http://192.168.0.104:3000/api/pods"
      );

      setPods(response.data.pods); 
    } catch (error) {
      console.log("Error fetching pods:", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00A8E1" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>☸️ Pods</Text>

      <FlatList
        data={pods}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              navigation.navigate("PodDetails", {
                podName: item.name, 
              })
            }
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.text}>Status: {item.status}</Text>
            <Text style={styles.text}>IP: {item.podIP}</Text>
          </Pressable>
        )}
      />

      <Pressable style={styles.homeButton}
      onPress={()=>router.push('/')}
      
      >
        <Text style={styles.textButton}>Go Back</Text>
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
  title: {
    fontSize: 22,
    color: "#00A8E1",
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 15,
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
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  homeButton:{
    backgroundColor:"orange",
    marginBottom:20,
    padding:12,
    borderRadius:10,
    alignItems:"center"
  },
  textButton:{
    color:"white",
    fontWeight:"bold",
    fontSize:14
  }
});