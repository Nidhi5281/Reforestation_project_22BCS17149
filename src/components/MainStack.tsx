import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { MapScreen } from "./screens/MapScreen";
import { DashboardScreen } from "./screens/DashboardScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { ForumScreen } from "./screens/ForumScreen";
import { LoginScreen } from "./screens/LoginScreen";

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => {
  return (
    <BaseNavigationContainer>
      <StackNavigator.Navigator
        initialRouteName="Map"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#2B5F39",
          },
          headerTintColor: "#fff",
          headerShown: true,
        }}
      >
        <StackNavigator.Screen
          name="Map"
          component={MapScreen}
          options={{ title: "Forest Map" }}
        />
        <StackNavigator.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ title: "Analytics" }}
        />
        <StackNavigator.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: "Settings" }}
        />
        <StackNavigator.Screen
          name="Forum"
          component={ForumScreen}
          options={{ title: "Community Forum" }}
        />
        <StackNavigator.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login", headerShown: false }}
        />
      </StackNavigator.Navigator>
    </BaseNavigationContainer>
  );
};