import { ImageBackground, View } from "react-native";
import NotAuthTabUser from "@/components/NotAuthTabUser";
import AuthTabUser from "@/components/AuthTabUser";
import { useAuthContext } from "@/context/AuthContext";
import AuthTabAdmin from "@/components/AuthTabAdmin";
import { SafeAreaView } from "react-native-safe-area-context";

export default function User() {
  const { isAuthenticated, user } = useAuthContext();

  let Content;

  if (isAuthenticated) {
    if (user?.role === "user") {
      Content = <AuthTabUser />;
    } else if (user?.role === "admin") {
      Content = <AuthTabAdmin />;
    } else {
      Content = <NotAuthTabUser />; // fallback if role unknown
    }
  } else {
    Content = <NotAuthTabUser />;
  }

  return (
    <ImageBackground
      source={require("../../assets/images/aboutBackground.jpg")}
      className="flex-1"
      blurRadius={3}
    >
      <View className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
      {Content}
    </ImageBackground>
  );
}
