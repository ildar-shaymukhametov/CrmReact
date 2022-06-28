import React, { useEffect } from "react";
import authService from "../components/api-authorization/AuthorizeService";
import { client } from "../utils/api-client";
import { useAsync } from "../utils/hooks";

export { AuthProvider, useAuth, useClient };

async function populateState() {
  const user = await authService.getUser();
  const token = await authService.getAccessToken();
  const userName = user && user.name;
  return userName
    ? {
        name: userName,
        token,
      }
    : null;
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
    run,
  } = useAsync();

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
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error}</div>;
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

function useClient() {
  const { user } = useAuth();
  const token = user?.token;
  return React.useCallback(
    (endpoint, config) => client(endpoint, { ...config, token }),
    [token]
  );
}
