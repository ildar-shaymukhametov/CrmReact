import React from "react";
import { Alert, Breadcrumb, BreadcrumbItem, Container } from "reactstrap";
import { CompanyForm } from "./CompanyForm";
import { useAsync } from "../../utils/hooks";
import { useCompany, useUpdateCompany } from "../../utils/companies";
import { AppRoutes } from "../../AppConstants";
import { Link, useNavigate, useParams } from "react-router-dom";

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
  const { isError, isLoading: isSubmitting, run } = useAsync();
  const { data, isLoading, isError: isLoadingError } = useCompany(id);

  function handleSubmit(data) {
    run(updateCompany(data));
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isLoadingError) {
    return <Alert color="danger">Failed to load company</Alert>;
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
      {isError ? <Alert color="danger">Failed to update company</Alert> : null}
      <h5>Edit company {id}</h5>
      <CompanyForm
        submitButtonText="Save changes"
        initialValues={data}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </Container>
  );
}
