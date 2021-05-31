import React, { lazy, Suspense } from "react";

const CreateCompanyPage = lazy(() => import("./create-company.page"));
const renderLoader = () => <p>Loading</p>;

export const LoadableCreateCompanyPage = () => (
  <Suspense fallback={renderLoader()}>
    <CreateCompanyPage />
  </Suspense>
);
