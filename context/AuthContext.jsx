// context/AuthContext.js
import { createContext, useContext, useEffect, useReducer } from "react";
import { validateJWT } from "../services/authService";
import CabinSpinner from "@/components/CabinSpinner";

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
        user: action.payload, // ✅ Add this line
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
        user: action.payload, // ✅ Add this line
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
        user: null, // ✅ Clear user on logout
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
        const data = await validateJWT(); // should return user data

        dispatch({
          type: "SESSION_VALIDATE_SUCCESS",
          payload: data.user, // ✅ Pass user to payload
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
