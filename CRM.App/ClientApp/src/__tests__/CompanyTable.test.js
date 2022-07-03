import React from "react";
import { buildCompany } from "../test/generate";
import { rest, server } from "../test/server";
import {
  login,
  render,
  screen,
  userEvent,
  waitForLoadingToFinish,
  within,
  waitFor,
} from "../test/utils";
import { App } from "../App";
import { ApiRoutes, AppRoutes } from "../AppConstants";

test("renders company table", async () => {
  const company = await renderTable();

  const table = screen.getByRole("table");
  expect(table).toContainElement(screen.getByText(company.name));
  expect(table).toContainElement(screen.getByText(company.no));
});

test("creates new company", async () => {
  await renderTable();
  screen.debug();

  expect(
    screen.queryByRole("heading", { name: /create a new company/i })
  ).not.toBeInTheDocument();

  const newCompany = screen.getByRole("link", { name: /new company/i });
  await userEvent.click(newCompany);

  await screen.findByRole("heading", { name: /create a new company/i });

  const type = screen.getByRole("textbox", { name: /type/i });
  const name = screen.getByRole("textbox", { name: /name/i });
  const inn = screen.getByRole("textbox", { name: /inn/i });
  const address = screen.getByRole("textbox", { name: /address/i });
  const ceo = screen.getByRole("textbox", { name: /ceo/i });
  const phone = screen.getByRole("textbox", { name: /phone/i });
  const email = screen.getByRole("textbox", { name: /email/i });
  const contacts = screen.getByRole("textbox", { name: /contacts/i });

  const company = buildCompany();

  await userEvent.type(type, company.type);
  await userEvent.type(name, company.name);
  await userEvent.type(inn, company.inn);
  await userEvent.type(address, company.address);
  await userEvent.type(ceo, company.ceo);
  await userEvent.type(phone, company.phone);
  await userEvent.type(email, company.email);
  await userEvent.type(contacts, company.contacts);

  server.resetHandlers(
    rest.get(ApiRoutes.Companies, async (req, res, ctx) => {
      return res(ctx.json([company]));
    })
  );

  const createNewCompany = screen.getByRole("button", {
    name: /create new company/i,
  });
  await userEvent.click(createNewCompany);
  expect(createNewCompany).toBeDisabled();

  await waitForLoadingToFinish();

  await waitFor(() => {
    expect(
      screen.queryByRole("heading", { name: /create a new company/i })
    ).not.toBeInTheDocument();
  });

  const inTable = within(screen.getByRole("table"));
  expect(inTable.getByText(company.type)).toBeInTheDocument();
  expect(inTable.getByText(company.name)).toBeInTheDocument();
  expect(inTable.getByText(company.inn)).toBeInTheDocument();
  expect(inTable.getByText(company.address)).toBeInTheDocument();
  expect(inTable.getByText(company.ceo)).toBeInTheDocument();
  expect(inTable.getByText(company.phone)).toBeInTheDocument();
  expect(inTable.getByText(company.email)).toBeInTheDocument();
  expect(inTable.getByText(company.contacts)).toBeInTheDocument();
});

async function renderTable() {
  login();
  const company = buildCompany();
  server.use(
    rest.get(ApiRoutes.Companies, async (req, res, ctx) => {
      return res(ctx.json([company]));
    })
  );
  await render(<App />, { route: AppRoutes.Companies });

  return company;
}
