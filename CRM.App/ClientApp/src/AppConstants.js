export const ApiRoutes = {
  Companies: "companies",
  UpdateCompany: (id) => `companies/${id}`,
  GetCompany: (id) => `companies/${id}`,
};

export const AppRoutes = {
  Companies: "/companies",
  NewCompany: "/companies/new",
  UpdateCompany: (id) => `/companies/${id}/edit`,
};
