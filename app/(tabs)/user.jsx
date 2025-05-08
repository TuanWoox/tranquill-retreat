import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import NotAuthTabUser from "@/components/NotAuthTabUser";
import AuthTabUser from "@/components/AuthTabUser";
import { useAuthContext } from "@/context/AuthContext";

export default function User() {
  const { isAuthenticated } = useAuthContext();
  return (
    <ImageBackground
      source={require("../../assets/images/aboutBackground.jpg")}
      className="flex-1"
    >
      <View className="absolute inset-0 bg-[rgb(20,28,36)] opacity-40" />
      {isAuthenticated ? <AuthTabUser /> : <NotAuthTabUser />}
    </ImageBackground>
  );
}
