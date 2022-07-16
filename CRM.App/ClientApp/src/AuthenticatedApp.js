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

export { AuthenticatedApp };

function AuthenticatedApp() {
  return (
    <>
      <Routes>
        {getAuthorizationRoutes()}
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="counter" element={<Counter />} />
          <Route path="fetch-data" element={<FetchData />} />
          <Route path="companies">
            <Route index element={<CompanyTable />} />
            <Route path="new" element={<NewCompany />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

function getAuthorizationRoutes() {
  return (
    <Route path={ApplicationPaths.ApiAuthorizationPrefix}>
      <Route path={ApplicationPaths.Login} element={<Login action={LoginActions.Login}></Login>} />
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
