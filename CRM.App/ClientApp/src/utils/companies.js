import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { ApiRoutes, AppRoutes } from "../AppConstants";
import { useClient } from "../context/AuthContext";

export { useCompanies, useCreateCompany, useUpdateCompany, useCompany };

function useCompanies() {
  const client = useClient();
  return useQuery("companies", () =>
    client(ApiRoutes.Companies).then((data) => data)
  );
}

function useCreateCompany() {
  const client = useClient();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation((data) => client(ApiRoutes.Companies, { data }), {
    onSettled: () => queryClient.invalidateQueries("companies"),
    onSuccess: (data) =>
      navigate(AppRoutes.Companies, {
        state: { isCompanyCreated: true, companyId: data },
      }),
  });
}

function useUpdateCompany(options) {
  const client = useClient();
  const queryClient = useQueryClient();

  return useMutation(
    (data) =>
      client(ApiRoutes.UpdateCompany(data.id), {
        method: "PUT",
        data,
      }),
    {
      onMutate(newItem) {
        const previousItems = queryClient.getQueryData("companies");

        queryClient.setQueryData("companies", (old) => {
          return old.map((item) => {
            return item.id === newItem.id ? { ...item, ...newItem } : item;
          });
        });

        return () => queryClient.setQueryData("companies", previousItems);
      },
      onSettled: () => queryClient.invalidateQueries("companies"),
      ...options,
    }
  );
}

function useCompany(id) {
  const client = useClient();
  return useQuery({
    queryKey: ["company", { id }],
    queryFn: () => client(ApiRoutes.GetCompany(id)).then((data) => data),
  });
}
