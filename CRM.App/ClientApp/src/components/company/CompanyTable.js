import React from "react";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../AppConstants";
import { useCompanies } from "../../utils/companies";

export { CompanyTable };

function CompanyTable() {
  const { data, isLoading, isError } = useCompanies();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div role="alert">Failed to load companies</div>;
  }

  return (
    <>
      <div>
        <Link to={AppRoutes.NewCompany}>New company</Link>
      </div>
      <table>
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
          {data.map(company => (
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
      </table>
    </>
  );
}
