import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeNavigator from "./homeStack";
import AboutNavigator from "./aboutStack";

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
    </Drawer.Navigator>
  );
}
