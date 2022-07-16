import React from "react";
import { Alert, Breadcrumb, BreadcrumbItem, Container } from "reactstrap";
import { CompanyForm } from "./CompanyForm";
import { useAsync } from "../../utils/hooks";
import { useCreateCompany } from "../../utils/companies";
import { Navigate } from "react-router-dom";
import { AppRoutes } from "../../AppConstants";
import { Link } from "react-router-dom";

export { NewCompany };

function NewCompany() {
  const { mutateAsync: handleCreateCompany } = useCreateCompany();
  const { isSuccess, isError, error, run, reset } = useAsync();

  function handleSubmit(data) {
    if (isError) {
      reset();
    } else {
      run(handleCreateCompany(data));
    }
  }

  if (isSuccess) {
    return <Navigate to={AppRoutes.Companies} />;
  }

  return (
    <Container>
      <div>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to={AppRoutes.Companies}>Companies</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>New</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <h5>Create a new company</h5>
      {isError ? (
        <Alert color="danger">Failed to create a new company: {error}</Alert>
      ) : null}
      <CompanyForm onSubmit={handleSubmit} />
    </Container>
  );
}
