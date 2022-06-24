import React, { useEffect } from "react";
import authService from "../components/api-authorization/AuthorizeService";
import { useAsync } from "../utils/hooks";

export { AuthProvider, useAuth };

async function populateState() {
  const [isAuthenticated, user] = await Promise.all([
    authService.isAuthenticated(),
    authService.getUser(),
  ]);

  return {
    isAuthenticated,
    name: user && user.name,
  };
}

const AuthContext = React.createContext();
AuthContext.displayName = "AuthContext";

function AuthProvider(props) {
  const {
    data: user,
    status,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run
  } = useAsync({
    isAuthenticated: false,
    name: null,
  });

  useEffect(() => {
    const _subscription = authService.subscribe(() => populateState());
    const userStatePromise = populateState();
    run(userStatePromise);

    return () => {
      authService.unsubscribe(_subscription);
    };
  }, [run]);

  const value = React.useMemo(() => ({ user }), [user]);

  if (isLoading || isIdle) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error}</div>
  }

  if (isSuccess) {
    return <AuthContext.Provider value={value} {...props} />;
  }

  throw new Error(`Unhandled status: ${status}`);
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}
