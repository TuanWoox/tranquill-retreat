// context/AuthContext.js
import { createContext, useContext, useEffect, useReducer } from "react";
import { validateJWT } from "../services/authService";
import CabinSpinner from "@/components/CabinSpinner";

// Initial state for authentication
const initialState = {
  isAuthenticated: false,
  loading: true,
  error: null,
};

// Reducer for handling auth actions
const authReducer = (state, action) => {
  switch (action.type) {
    case "SESSION_VALIDATE_REQUEST":
      return { ...state, loading: true, error: null };
    case "SESSION_VALIDATE_SUCCESS":
      return { ...state, isAuthenticated: true, loading: false, error: null };
    case "SESSION_VALIDATE_FAILURE":
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };

    case "LOGIN_REQUEST":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true, loading: false, error: null };
    case "LOGIN_FAILURE":
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return { ...state, isAuthenticated: false, loading: false, error: null };

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
        await validateJWT(); // Validate the JWT session
        dispatch({ type: "SESSION_VALIDATE_SUCCESS" });
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
