import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  Pressable,
  Modal,
  Keyboard,
} from "react-native";
import { globalStyles, images } from "../styles/global";
import Card from "../shared/card";
import { MaterialIcons } from "@expo/vector-icons";
import ReviewUpdateForm from "./reviewUpdateForm";

import { baseURL } from "../shared/Apiconfig";
import * as SecureStore from "expo-secure-store";

export default function ReviewDetails({ route, navigation }) {
  const [modalOpen, setModalOpen] = useState(false);

  const { item } = route.params;
  const rating = item.rating;

  const onDelete = async () => {
    try {
      const keyItem = await SecureStore.getItemAsync("token");
      const token = JSON.parse(keyItem);

      if (token) {
        const response = await fetch(`${baseURL}/reviews/${item.id}/`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token.access_token}`,
          },
        });

        if (response.ok) {
          console.log("Review deleted successfully");
          navigation.navigate("Home");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateReview = async (review) => {
    try {
      const keyItem = await SecureStore.getItemAsync("token");
      const token = JSON.parse(keyItem);

      if (token) {
        const formData = new FormData();
        formData.append("title", review.title);
        formData.append("body", review.body);
        formData.append("rating", review.rating);

        const response = await fetch(`${baseURL}/reviews/${item.id}/`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token.access_token}`,
          },
          body: formData,
        });
        if (response.ok) {
          const json = await response.json();
          console.log("Review updated successfully");
          console.log(json);
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
            <ReviewUpdateForm updateReview={updateReview} item={item} />
          </View>
        </Pressable>
      </Modal>

      <Card>
        <Text>{item.title}</Text>
        <Text>{item.body}</Text>
        <View style={styles.rating}>
          <Text>GameZone rating: </Text>
          <Image source={images.ratings[rating]} />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Pressable onPress={onDelete}>
            <MaterialIcons name="delete" style={styles.Button} size={24} />
          </Pressable>

          <Pressable onPress={() => setModalOpen(true)}>
            <Text style={{ ...styles.Button, fontSize: 20 }}>Edit</Text>
          </Pressable>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  rating: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 16,
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  Button: {
    marginBottom: 10,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
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
