import React, { lazy, Suspense } from "react";

const CreateEmployeePage = lazy(() => import("./create-employee.page"));
const renderLoader = () => <p>Loading</p>;

export const LoadableCreateEmployeePage = () => (
  <Suspense fallback={renderLoader()}>
    <CreateEmployeePage />
  </Suspense>
);
