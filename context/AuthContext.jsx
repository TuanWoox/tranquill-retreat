import { createContext, useContext, useEffect, useReducer } from "react";
import { validateJWT } from "../services/authService";
import CabinSpinner from "@/components/CabinSpinner";
import NotFoundCard from "@/components/NotFoundCard"; // Reuse your not found card for error display
import EntryPointFail from "@/components/EntryPointFail";

// Initial state for authentication
const initialState = {
  isAuthenticated: false,
  loading: true,
  error: null,
  user: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "SESSION_VALIDATE_REQUEST":
      return { ...state, loading: true, error: null };
    case "SESSION_VALIDATE_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        error: null,
        user: action.payload,
      };
    case "SESSION_VALIDATE_FAILURE":
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
        user: null,
      };
    case "LOGIN_REQUEST":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        error: null,
        user: action.payload,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
        user: null,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error: null,
        user: null,
      };
    case "UPDATE": {
      return {
        ...state,
        user: action.payload,
      };
    }
    default:
      return state;
  }
};

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const checkSession = async () => {
      dispatch({ type: "SESSION_VALIDATE_REQUEST" });
      try {
        const data = await validateJWT();
        dispatch({
          type: "SESSION_VALIDATE_SUCCESS",
          payload: data.user,
        });
      } catch (err) {
        dispatch({
          type: "SESSION_VALIDATE_FAILURE",
          payload: err?.message || "Session validation failed",
        });
      }
    };

    checkSession();
  }, []);

  if (state.loading) {
    return <CabinSpinner />;
  }

  if (state.error) {
    if (
      typeof state.error === "string" &&
      state.error.toLowerCase().includes("wifi")
    ) {
      return (
        <EntryPointFail
          error={state.error}
          title="WiFi is Off"
          suggestion="Turn on WiFi or mobile data and try again."
          icon="wifi"
        />
      );
    }
    if (
      typeof state.error === "string" &&
      state.error.toLowerCase().includes("connect to server")
    ) {
      return (
        <EntryPointFail
          error={state.error}
          title="Cannot Connect to Server"
          suggestion="Please check your internet connection or try again later."
          icon="disconnect"
        />
      );
    }
  }

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
