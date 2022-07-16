import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { FetchData } from "./components/FetchData";
import { Counter } from "./components/Counter";
import { AppRoutes } from "./AppConstants";
import { CompanyTable } from "./components/company/CompanyTable";
import { NewCompany } from "./components/company/NewCompany";

export { AuthenticatedApp };

function AuthenticatedApp() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/fetch-data" element={<FetchData />} />
        <Route path={AppRoutes.Companies} element={<CompanyTable />} />
        <Route path={AppRoutes.NewCompany} element={<NewCompany />} />
      </Route>
    </Routes>
  );
}
