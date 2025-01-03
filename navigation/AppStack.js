import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen, DetectionFeature, ProfileScreen, EditProfilePicture } from "../screens";
import { DetectionResult } from "../screens/DetectionResult";

const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="DetectionFeature" component={DetectionFeature} />
      <Stack.Screen name="DetectionResult" component={DetectionResult} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfilePicture" component={EditProfilePicture} />
    </Stack.Navigator>
  );
};
