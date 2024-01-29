import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeNavigator from "./homeStack";
import AboutNavigator from "./aboutStack";
import Login from "../screens/login";

import React from "react";
import { Image, StyleSheet } from "react-native";
import Header from "../shared/header";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="HomeNavigator"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{
          title: "Home",
        }}
      />
      <Drawer.Screen
        name="AboutNavigator"
        component={AboutNavigator}
        options={{
          title: "About",
        }}
      />
      <Drawer.Screen
        name="LoginScreen"
        component={Login}
        options={({ navigation }) => {
          return {
            title: "Login",
            headerShown: true,
            headerTitle: () => (
              <Header navigation={navigation} title="GameZone" />
            ),
            headerLeft: () => null,
            headerBackground: () => (
              <Image
                source={require("../assets/game_bg.png")}
                style={{ flex: 1 }}
              />
            ),
            headerStyle: {
              backgroundColor: "transparent",
            },
          };
        }}
      />
    </Drawer.Navigator>
  );
}
