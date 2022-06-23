import React, { useEffect, useState } from "react";
import authService from "../components/api-authorization/AuthorizeService";

export { AuthProvider, useAuth };

const AuthContext = React.createContext();
AuthContext.displayName = "AuthContext";

function AuthProvider(props) {
  const [state, setState] = useState({
    isAuthenticated: false,
    userName: null,
  });

  useEffect(() => {
    async function populateState() {
      const [isAuthenticated, user] = await Promise.all([
        authService.isAuthenticated(),
        authService.getUser(),
      ]);
      setState({
        isAuthenticated,
        userName: user && user.name,
      });
    }

    const _subscription = authService.subscribe(() => populateState());
    populateState();

    return () => {
      authService.unsubscribe(_subscription);
    };
  }, []);

  const { isAuthenticated, userName } = state;
  const value = React.useMemo(
    () => ({ userName, isAuthenticated }),
    [userName, isAuthenticated]
  );

  return <AuthContext.Provider value={value} {...props} />;
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}
