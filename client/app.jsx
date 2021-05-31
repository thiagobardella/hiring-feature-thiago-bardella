import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Header } from "./base-components/header";
import { PageWrapper } from "./base-components/page-wrapper";
import { LoadableCompaniesPage } from "./pages/companies/loadable-companies.page";
import { LoadableCompanyDetailsPage } from "./pages/company-details/loadable-company-details.page";
import { LoadableCreateCompanyPage } from "./pages/create-company/loadable-create-company-page";
import { LoadableCreateEmployeePage } from "./pages/create-employee/loadable-create-employee-page";
import { LoadableEmployeeDetailsPage } from "./pages/employee-details/loadable-employee-details.page";
import { LoadableEmployeesPage } from "./pages/employees/loadable-employees.page";

export const App = () => (
  <BrowserRouter>
    <Header />
    <PageWrapper>
      <Switch>
        <Route
          path="/create-company"
          component={() => <LoadableCreateCompanyPage />}
        />
        <Route
          path="/create-employee"
          component={() => <LoadableCreateEmployeePage />}
        />
        <Route
          path="/companies/:companyId"
          component={() => <LoadableCompanyDetailsPage />}
        />
        <Route
          path="/employees/:employeeId"
          component={() => <LoadableEmployeeDetailsPage />}
        />
        <Route path="/companies" component={() => <LoadableCompaniesPage />} />
        <Route path="/employees" component={() => <LoadableEmployeesPage />} />
        <Redirect to="/companies" />
      </Switch>
    </PageWrapper>
  </BrowserRouter>
);
