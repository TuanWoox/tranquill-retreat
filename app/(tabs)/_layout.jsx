import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TabIcon = ({ focused, iconName, title }) => {
  if (!focused) {
    return (
      <View className="size-full justify-center items-center mt-4   ">
        <Ionicons name={iconName} size={20} color="#A8B5DB" />
      </View>
    );
  }

  return (
    <View className="flex-col w-full flex-1 min-w-[112px] min-h-16 justify-center items-center mt-auto border-b-[3px] border-black">
      <Ionicons name={iconName} size={20} color="#151312" />
      <Text className="text-secondary text-base font-semibold ml-2 ">
        {title}
      </Text>
    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "white",
          borderRadius: 20,
          marginHorizontal: 10,
          marginBottom: 25,
          height: 70,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              iconName="information-circle"
              title="About"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Cabins",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="home" title="Cabins" />
          ),
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: "Personal",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="person" title="Personal" />
          ),
        }}
      />
    </Tabs>
  );
}
