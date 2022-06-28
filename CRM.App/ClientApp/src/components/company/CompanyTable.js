import React from "react";
import { useQuery } from "react-query";
import { ApiRoutes } from "../../AppConstants";
import { useClient } from "../../context/AuthContext";

export { CompanyTable };

function useCompanies() {
  const client = useClient();
  return useQuery("companies", () =>
    client(ApiRoutes.Companies).then(data => data)
  );
}

function CompanyTable() {
  const { data, isLoading, isError } = useCompanies();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div role="alert">Failed to load companies</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {data.map(company => (
          <tr key={company.no}>
            <td>{company.no}</td>
            <td>{company.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
