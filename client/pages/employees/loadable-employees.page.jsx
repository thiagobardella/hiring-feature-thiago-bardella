import React, { lazy, Suspense } from "react";

const EmployeesPage = lazy(() => import("./employees.page"));
const renderLoader = () => <p>Loading</p>;

export const LoadableEmployeesPage = () => (
  <Suspense fallback={renderLoader()}>
    <EmployeesPage />
  </Suspense>
);
