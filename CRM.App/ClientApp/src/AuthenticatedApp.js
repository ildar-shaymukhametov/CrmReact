import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { FetchData } from "./components/FetchData";
import { Counter } from "./components/Counter";
import { CompanyTable } from "./components/company/CompanyTable";
import { NewCompany } from "./components/company/NewCompany";
import {
  ApplicationPaths,
  LoginActions,
  LogoutActions,
} from "./components/api-authorization/ApiAuthorizationConstants";
import { Login } from "./components/api-authorization/Login";
import { Logout } from "./components/api-authorization/Logout";
import { AppRoutes } from "./AppConstants";
import { EditCompany } from "./components/company/EditCompany";
import { ErrorBoundary } from "react-error-boundary";
import { FullPageErrorFallback } from "./components/lib";

export { AuthenticatedApp };

function AuthenticatedApp() {
  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <Routes>
        {getAuthorizationRoutes()}
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="counter" element={<Counter />} />
          <Route path="fetch-data" element={<FetchData />} />
          <Route path={AppRoutes.Companies}>
            <Route index element={<CompanyTable />} />
            <Route path={AppRoutes.NewCompany} element={<NewCompany />} />
            <Route
              path={AppRoutes.UpdateCompany(":id")}
              element={<EditCompany />}
            />
          </Route>
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}

function getAuthorizationRoutes() {
  return (
    <Route path={ApplicationPaths.ApiAuthorizationPrefix}>
      <Route
        path={ApplicationPaths.Login}
        element={<Login action={LoginActions.Login}></Login>}
      />
      <Route
        path={ApplicationPaths.LoginCallback}
        element={<Login action={LoginActions.LoginCallback}></Login>}
      />
      <Route
        path={ApplicationPaths.Profile}
        element={<Login action={LoginActions.Profile}></Login>}
      />
      <Route
        path={ApplicationPaths.LogOut}
        element={<Logout action={LogoutActions.Logout}></Logout>}
      />
    </Route>
  );
}
