import React from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { FetchData } from "./components/FetchData";
import { Counter } from "./components/Counter";
import AuthorizeRoute from "./components/api-authorization/AuthorizeRoute";
import { ApiRoutes } from "./AppConstants";
import { CompanyTable } from "./components/company/CompanyTable";

export { AuthenticatedApp };

function AuthenticatedApp() {
  return (
    <Layout>
      <Route exact path="/" component={Home} />
      <Route path="/counter" component={Counter} />
      <Route path={`/${ApiRoutes.Companies}`} component={CompanyTable} />
      <AuthorizeRoute path="/fetch-data" component={FetchData} />
    </Layout>
  );
}
