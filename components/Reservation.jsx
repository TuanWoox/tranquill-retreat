import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { auth } from "../services/auth";
import { getBookedDatesByCabinId, getSettings } from "../services/data-service";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";

const Reservation = ({ cabin }) => {
  const [settings, setSettings] = useState(null);
  const [bookedDates, setBookedDates] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const [fetchedSettings, fetchedBookedDates] = await Promise.all([
        getSettings(),
        getBookedDatesByCabinId(cabin.id),
      ]);
      setSettings(fetchedSettings);
      setBookedDates(fetchedBookedDates);

      const fetchedSession = await auth();
      setSession(fetchedSession);
    };

    fetchData();
  }, [cabin.id]);

  if (!settings || !bookedDates) {
    return null; // Or a loading indicator
  }

  return (
    <View style={styles.container}>
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#1E3A8A", // Replace with your primary color
    minHeight: 100,
  },
});

export default Reservation;
