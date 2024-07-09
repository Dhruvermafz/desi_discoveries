import { createContext, useEffect, useReducer } from "react";

const initial_state = {
  user:
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  userId: localStorage.getItem("userId") || null,
  loading: false,
  error: false,
};

const AuthContext = createContext(initial_state);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        user: null,
        userId: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        userId: action.payload.userId,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        userId: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        userId: null,
        loading: false,
        error: null,
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        user: null,
        userId: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initial_state);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("userId", state.userId);
  }, [state.user, state.userId]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        userId: state.userId,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
