import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import tintColor from "../constants/Colors";
import TabBarIcon from "../components/TabBarIcon";
import DiscoverScreen from "../screens/DiscoverScreen";
import LinksScreen from "../screens/LinksScreen";
import LetScreen from "../screens/LetScreen";
import SettingsScreen from "../screens/SettingsScreen";

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

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: "Profile",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-person" : "md-person"}
    />
  )
};

LinksStack.path = "";

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: "Notifications",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-notifications" : "md-notifications"}
    />
  )
};

SettingsStack.path = "";

const tabNavigator = createBottomTabNavigator(
  {
    DiscoverStack,
    LetStack,
    LinksStack,
    SettingsStack
  },
  {
    tabBarOptions: {
      activeTintColor: tintColor
    }
  }
);

tabNavigator.path = "";

export default tabNavigator;
