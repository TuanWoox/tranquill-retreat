// hooks/useAuthSession.js
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../services/supbase";
import { getUserInfo } from "../services/data-service";

export function useAuthSession() {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const initSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setUser(data.session?.user ?? null);
    };
    initSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const {
    data: userInfo,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getUserInfo(user.id),
    enabled: !!session, // only fetch when user exists
  });

  return {
    session,
    userInfo,
    userInfoLoading: isLoading,
    userInfoError: error,
  };
}
