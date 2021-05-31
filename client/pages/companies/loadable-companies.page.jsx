import React, { lazy, Suspense } from "react";

const CompaniesPage = lazy(() => import("./companies.page"));
const renderLoader = () => <p>Loading</p>;

export const LoadableCompaniesPage = () => (
  <Suspense fallback={renderLoader()}>
    <CompaniesPage />
  </Suspense>
);
