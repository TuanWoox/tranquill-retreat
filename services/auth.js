import React, { useState } from "react";
import { Button, View, Text } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { createGuest, getGuest } from "./data-service";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [user, setUser] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.AUTH_GOOGLE_ID,
    androidClientId: process.env.AUTH_GOOGLE_ANDROID_ID,
    iosClientId: process.env.AUTH_GOOGLE_IOS_ID,
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      fetchUserInfo(authentication.accessToken);
    }
  }, [response]);

  const fetchUserInfo = async (accessToken) => {
    try {
      const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const userInfo = await res.json();

      const existingGuest = await getGuest(userInfo.email);
      if (!existingGuest) {
        await createGuest({ email: userInfo.email, fullName: userInfo.name });
      }

      setUser({ ...userInfo, guestId: existingGuest?.id || userInfo.id });
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {user ? (
        <Text>Welcome, {user.name}</Text>
      ) : (
        <Button
          disabled={!request}
          title="Sign in with Google"
          onPress={() => promptAsync()}
        />
      )}
    </View>
  );
}
