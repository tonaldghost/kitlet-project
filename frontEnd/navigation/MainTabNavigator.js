import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import tintColor from "../constants/Colors";
import TabBarIcon from "../components/TabBarIcon";
import DiscoverScreen from "../screens/DiscoverScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import LetScreen from "../screens/LetScreen";
import ProfileScreen from "../screens/ProfileScreen";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const DiscoverStack = createStackNavigator(
  {
    Discover: DiscoverScreen
  },
  config
);

DiscoverStack.navigationOptions = {
  tabBarLabel: "Discover",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-home${focused ? "" : "-outline"}`
          : "md-home"
      }
    />
  )
};

DiscoverStack.path = "";

const LetStack = createStackNavigator(
  {
    Let: LetScreen
  },
  config
);

LetStack.navigationOptions = {
  tabBarLabel: "Let",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-cash${focused ? "" : "-outline"}`
          : "md-cash"
      }
    />
  )
};

LetStack.path = "";

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen
  },
  config
);

ProfileStack.navigationOptions = {
  tabBarLabel: "Profile",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-person" : "md-person"}
    />
  )
};

ProfileStack.path = "";

const NotificationsStack = createStackNavigator(
  {
    Notifications: NotificationsScreen
  },
  config
);

NotificationsStack.navigationOptions = {
  tabBarLabel: "Notifications",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-notifications" : "md-notifications"}
    />
  )
};

NotificationsStack.path = "";

const tabNavigator = createBottomTabNavigator(
  {
    DiscoverStack,
    LetStack,
    ProfileStack,
    NotificationsStack
  },
  {
    tabBarOptions: {
      activeTintColor: tintColor
    }
  }
);

tabNavigator.path = "";

export default tabNavigator;
