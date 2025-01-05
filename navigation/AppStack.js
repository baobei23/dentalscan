import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen, DetectionFeature, ProfileScreen, EditProfilePicture, DentistListScreen, DentistInfoScreen, ConsultationScheduleScreen, LocateYourProblem, InvoiceScreen } from "../screens";
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
      <Stack.Screen name="DentistList" component={DentistListScreen} />
      <Stack.Screen name="DentistInfo" component={DentistInfoScreen} />
      <Stack.Screen name="ConsultationSchedule" component={ConsultationScheduleScreen} />
      <Stack.Screen name="LocateYourProblem" component={LocateYourProblem} />
      <Stack.Screen name="Invoice" component={InvoiceScreen} />
    </Stack.Navigator>
  );
};
