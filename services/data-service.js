import { supabase } from "./supbase";
export const getCabins = async function () {
  const { data, error } = await supabase
    .from("cabins")
    .select("id, name, maxCapacity, regularPrice, discount, image")
    .order("name");

  if (error) {
    throw new Error("Cabins could not be loaded");
  }

  return data;
};

export const signUp = async function (data) {
  try {
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });
    if (error) {
      console.error("Signup error:", error.message);
      throw error;
    }
    const user = authData.user;
    if (user) {
      const { error: guestError } = await supabase.from("guests").insert([
        {
          id: user.id,
          fullName: data.fullName,
          email: data.email,
          nationalId: data.nationalId,
          phoneNumber: data.phoneNumber,
          dateOfBirth: data.dateOfBirth,
          role: "guests",
        },
      ]);
      if (guestError) {
        console.error("Error inserting into guest table:", guestError);
        throw guestError;
      }
    }
    return authData;
  } catch (err) {
    console.error("Unexpected error during sign up:", err.message);
    throw err;
  }
};
export const logIn = async function (data) {
  try {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      console.error("Login error:", error.message);
      throw error;
    }

    return authData;
  } catch (err) {
    console.error("Unexpected error during login:", err.message);
    throw err;
  }
};

export const logOut = async function () {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (err) {
    console.error("Sign out failed:", err.message || err);
    // Optionally, you can throw it again or handle it differently
    throw err;
  }
};
// Function to get extended user info from Supabase DB
export const getUserInfo = async (userId) => {
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) throw new Error(error.message);
  return data;
};
