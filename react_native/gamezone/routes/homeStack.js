import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/home";
import ReviewDetails from "../screens/reviewDetail";
import Header from "../shared/header";
import React from "react";
import { Image, StyleSheet } from "react-native";

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "#444",
        headerStyle: {
          backgroundColor: "#ddd",
          height: 60,
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => {
          return {
            headerTitle: () => (
              <Header navigation={navigation} title="GameZone" />
            ),
            headerBackground: () => (
              <Image
                source={require("../assets/game_bg.png")}
                style={[StyleSheet.absoluteFill]}
              />
            ),
            headerStyle: {
              backgroundColor: "transparent",
            },
          };
        }}
      />
      <Stack.Screen
        name="Details"
        component={ReviewDetails}
        options={{
          title: "Review Details",
        }}
      />
    </Stack.Navigator>
  );
}
