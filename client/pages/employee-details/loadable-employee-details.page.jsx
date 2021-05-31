import React, { lazy, Suspense } from "react";

const EmployeeDetailsPage = lazy(() => import("./employee-details.page"));
const renderLoader = () => <p>Loading</p>;

export const LoadableEmployeeDetailsPage = () => (
  <Suspense fallback={renderLoader()}>
    <EmployeeDetailsPage />
  </Suspense>
);
