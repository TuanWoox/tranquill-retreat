import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

function NotFound() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This cabin could not be found :(</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Cabins")}
      >
        <Text style={styles.buttonText}>Back to all cabins</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#FFD700", // Replace with your accent color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "#4B0082", // Replace with your primary color
    fontSize: 16,
    fontWeight: "500",
  },
});

export default NotFound;
