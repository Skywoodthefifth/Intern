import { createNativeStackNavigator } from "@react-navigation/native-stack";

import About from "../screens/about";
import Header from "../shared/header";
import React from "react";

const Stack = createNativeStackNavigator();

export default function AboutNavigator() {
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
        name="About"
        component={About}
        options={({ navigation }) => {
          return {
            headerTitle: () => (
              <Header navigation={navigation} title="About GameZone" />
            ),
          };
        }}
      />
    </Stack.Navigator>
  );
}
