import React from "react";
import { Alert, Breadcrumb, BreadcrumbItem, Container } from "reactstrap";
import { CompanyForm } from "./CompanyForm";
import { useAsync } from "../../utils/hooks";
import { useCompany, useUpdateCompany } from "../../utils/companies";
import { AppRoutes } from "../../AppConstants";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LoadingButton } from "../lib";

export { EditCompany };

function EditCompany() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { mutateAsync: updateCompany } = useUpdateCompany({
    onSuccess: () =>
      navigate(AppRoutes.Companies, {
        state: { isCompanyUpdated: true, companyId: id },
      }),
  });
  const { isLoading: isSubmitting, isError, error, run, reset } = useAsync();
  const { data, isLoading } = useCompany(id);

  function handleSubmit(data) {
    if (isError) {
      reset();
    } else {
      run(updateCompany(data));
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <div>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to={AppRoutes.Companies}>Companies</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Edit company {id}</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <h5>Edit company {id}</h5>
      {isError ? (
        <Alert color="danger">Failed to update company: {error}</Alert>
      ) : null}
      <CompanyForm initialValues={data} onSubmit={handleSubmit}>
        <div className="d-flex justify-content-end">
          <LoadingButton color="success" type="submit" isLoading={isSubmitting}>
            Save changes
          </LoadingButton>
        </div>
      </CompanyForm>
    </Container>
  );
}
