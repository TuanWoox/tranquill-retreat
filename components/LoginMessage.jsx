import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

function LoginMessage() {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1E293B",
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: 18,
          color: "#FFFFFF",
          marginBottom: 12,
        }}
      >
        Please{" "}
        <Text
          style={{ textDecorationLine: "underline", color: "#38BDF8" }}
          onPress={() => navigation.navigate("Login")}
        >
          login
        </Text>{" "}
        to reserve this
        {"\n"} cabin right now
      </Text>
    </View>
  );
}

export default LoginMessage;
