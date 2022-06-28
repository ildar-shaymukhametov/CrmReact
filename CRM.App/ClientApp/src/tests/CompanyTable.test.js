import React from "react";
import { buildCompany } from "../test/generate";
import { rest, server } from "../test/server";
import { login, render, screen } from "../test/utils";
import { App } from "../App";
import { ApiRoutes } from "../AppConstants";

test("renders company table", async () => {
  login();
  const company = buildCompany();
  server.use(
    rest.get(ApiRoutes.Companies, async (req, res, ctx) => {
      return res(ctx.json({ companies: [company] }));
    })
  );
  await render(<App />, { route: `/${ApiRoutes.Companies}` });

  const table = screen.getByRole("table");
  expect(table).toContainElement(screen.getByText(company.name));
  expect(table).toContainElement(screen.getByText(company.no));
});
