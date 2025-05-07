import { Alert } from "react-native";
import { supabase } from "./supbase";
import { auth, signIn, signOut } from "./auth";
import { getBookings } from "./data-service";

export async function createBooking(bookingData, formData, navigation) {
  const session = await auth();
  if (!session) {
    Alert.alert("Error", "You must be logged in");
    return;
  }

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.numGuests),
    observations: formData.observations.slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) {
    Alert.alert("Error", "Booking could not be created");
    return;
  }

  // Navigate to the thank-you screen
  navigation.navigate("ThankYou");
}

export async function updateGuest(formData, navigation) {
  const session = await auth();
  if (!session) {
    Alert.alert("Error", "You must be logged in");
    return;
  }

  const nationalID = formData.nationalID;
  const [nationality, countryFlag] = formData.nationality.split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    Alert.alert("Error", "Please provide a valid national ID");
    return;
  }

  const updateData = { nationality, countryFlag, nationalID };
  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) {
    Alert.alert("Error", "Guest could not be updated");
    return;
  }

  // Navigate back to the profile screen
  navigation.navigate("Profile");
}

export async function updateReservation(formData, navigation) {
  const session = await auth();
  if (!session) {
    Alert.alert("Error", "You must be logged in");
    return;
  }

  const reservationData = {
    numGuests: Number(formData.numGuests),
    observations: formData.observations.slice(0, 1000),
  };

  const reservationId = Number(formData.reservationId);

  if (isNaN(reservationData.numGuests)) {
    Alert.alert("Error", "The number of guests is not valid");
    return;
  }

  const { error } = await supabase
    .from("bookings")
    .update(reservationData)
    .eq("id", reservationId)
    .eq("guestId", session.user.guestId);

  if (error) {
    Alert.alert("Error", "Booking could not be updated");
    return;
  }

  // Navigate back to the reservations screen
  navigation.navigate("Reservations");
}

export async function deleteReservation(bookingId, navigation) {
  const session = await auth();
  if (!session) {
    Alert.alert("Error", "You must be logged in");
    return;
  }

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId)
    .eq("guestId", session.user.guestId);

  if (error) {
    Alert.alert("Error", "Booking could not be deleted");
    return;
  }

  // Navigate back to the reservations screen
  navigation.navigate("Reservations");
}

export async function signInAction(navigation) {
  await signIn("google");
  navigation.navigate("Account");
}

export async function signOutAction(navigation) {
  await signOut();
  navigation.navigate("Home");
}
