import { useMutation, useQuery, useQueryClient } from "react-query";
import { ApiRoutes } from "../AppConstants";
import { useClient } from "../context/AuthContext";

export { useCompanies, useCreateCompany };

function useCompanies() {
  const client = useClient();
  return useQuery("companies", () =>
    client(ApiRoutes.Companies).then(data => data)
  );
}

function useCreateCompany() {
  const client = useClient();
  const queryClient = useQueryClient();

  return useMutation(({ data }) => client(ApiRoutes.Companies, { data }), {
    onSettled: () => queryClient.invalidateQueries("companies"),
  });
}
