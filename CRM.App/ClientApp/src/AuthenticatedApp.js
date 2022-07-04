import React from "react";
import { Route, Switch } from "react-router-dom";
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
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/counter" component={Counter} />
        <Route path="/fetch-data" component={FetchData} />
        <Route exact path={AppRoutes.Companies} component={CompanyTable} />
        <Route path={AppRoutes.NewCompany} component={NewCompany} />
      </Switch>
    </Layout>
  );
}
