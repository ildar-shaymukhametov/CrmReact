import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Alert, Button, Table } from "reactstrap";
import { AppRoutes } from "../../AppConstants";
import { useCompanies } from "../../utils/companies";

export { CompanyTable };

function CompanyTable() {
  const { data, isLoading, isError } = useCompanies();
  const { state } = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div role="alert">Failed to load companies</div>;
  }

  return (
    <>
      {state?.isCompanyCreated ? (
        <Alert color="success">New company created: {state?.companyId}</Alert>
      ) : null}
      <div className="mb-2">
        <Button color="success" tag={Link} to={AppRoutes.NewCompany}>
          New company
        </Button>
      </div>
      <Table striped>
        <thead>
          <tr>
            <th>Id</th>
            <th>Type</th>
            <th>Name</th>
            <th>Inn</th>
            <th>Address</th>
            <th>Ceo</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Contacts</th>
          </tr>
        </thead>
        <tbody>
          {data.map((company) => (
            <tr key={company.id}>
              <td>{company.id}</td>
              <td>{company.type}</td>
              <td>{company.name}</td>
              <td>{company.inn}</td>
              <td>{company.address}</td>
              <td>{company.ceo}</td>
              <td>{company.phone}</td>
              <td>{company.email}</td>
              <td>{company.contacts}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
