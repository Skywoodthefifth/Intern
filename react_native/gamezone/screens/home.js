import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  Modal,
  Keyboard,
} from "react-native";
import { globalStyles } from "../styles/global";
import Card from "../shared/card";
import { MaterialIcons } from "@expo/vector-icons";
import ReviewForm from "./reviewForm";

import { useFocusEffect } from "@react-navigation/native";

import { baseURL } from "../shared/Apiconfig";
import * as SecureStore from "expo-secure-store";

export default function Home({ navigation }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [reviews, setReviews] = useState();

  const getReviewsFromApi = async () => {
    try {
      const keyItem = await SecureStore.getItemAsync("token");
      const token = JSON.parse(keyItem);

      if (token) {
        const response = await fetch(`${baseURL}/reviews/`, {
          headers: {
            Authorization: `Bearer ${token.access_token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          console.log("Get all reviews successfully");
          const json = await response.json();
          setReviews(json.results);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getReviewsFromApi();
    }, [])
  );

  const addReview = async (review) => {
    try {
      const keyItem = await SecureStore.getItemAsync("token");
      const token = JSON.parse(keyItem);

      if (token) {
        const response = await fetch(`${baseURL}/reviews/`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token.access_token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(review),
        });

        if (response.ok) {
          console.log("Review created successfully");
          await getReviewsFromApi();
        }
      }
    } catch (error) {
      console.error(error);
    }

    setModalOpen(false);
  };

  return (
    <View style={globalStyles.container}>
      <Modal visible={modalOpen} animationType="slide">
        <Pressable style={styles.modalContent} onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <MaterialIcons
              name="close"
              size={24}
              style={{ ...styles.modalToggle, ...styles.modalClose }}
              onPress={() => setModalOpen(false)}
            />
            <ReviewForm addReview={addReview} />
          </View>
        </Pressable>
      </Modal>

      <MaterialIcons
        name="add"
        size={24}
        style={styles.modalToggle}
        onPress={() => setModalOpen(true)}
      />

      <FlatList
        keyExtractor={(item) => item.id}
        data={reviews}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate("Details", { item })}>
            <Card>
              <Text style={globalStyles.titleText}>{item.title}</Text>
            </Card>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  modalToggle: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
  modalContent: {
    flex: 1,
  },
});
