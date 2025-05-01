import { Ionicons } from "@expo/vector-icons";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { useAuthSession } from "@/hooks/useAuthSession";
import NotAuthTabUser from "@/components/NotAuthTabUser";
import AuthTabUser from "@/components/AuthTabUser";

export default function User() {
  const { userInfo, session } = useAuthSession();
  return (
    <ImageBackground
      source={require("../../assets/images/aboutBackground.jpg")}
      className="flex-1"
    >
      {/* Apply semi-transparent overlay as a separate View */}
      <View className="absolute inset-0 bg-[rgb(20,28,36)] opacity-40" />
      {session ? <AuthTabUser /> : <NotAuthTabUser />}
      {/* Keep the content container fully opaque */}
    </ImageBackground>
  );
}
