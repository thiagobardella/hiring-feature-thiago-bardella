import React, { lazy, Suspense } from "react";

const CompanyDetailsPage = lazy(() => import("./company-details.page"));
const renderLoader = () => <p>Loading</p>;

export const LoadableCompanyDetailsPage = () => (
  <Suspense fallback={renderLoader()}>
    <CompanyDetailsPage />
  </Suspense>
);
