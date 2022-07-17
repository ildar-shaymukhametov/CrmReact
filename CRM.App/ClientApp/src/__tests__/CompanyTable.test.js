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

test("renders table", async () => {
  const company = await renderTable();

  const inTable = within(screen.getByRole("table"));
  expectCompanyToBeInTable(inTable, company);
});

test("creates company", async () => {
  await renderTable();

  expect(
    screen.queryByRole("heading", { name: /create a new company/i })
  ).not.toBeInTheDocument();

  const newCompanyButton = screen.getByRole("link", { name: /new company/i });
  await userEvent.click(newCompanyButton);

  expect(
    screen.queryByRole("heading", { name: /create a new company/i })
  ).toBeInTheDocument();

  const [type, name, inn, address, ceo, phone, email, contacts] = getInputs();
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
    rest.post(ApiRoutes.Companies, async (req, res, ctx) => {
      return res(ctx.json(company.id));
    }),
    rest.get(ApiRoutes.Companies, async (req, res, ctx) => {
      return res(ctx.json([company]));
    })
  );

  const submit = screen.getByRole("button", {
    name: /create new company/i,
  });
  await userEvent.click(submit);
  expect(submit).toBeDisabled();

  await waitForLoadingToFinish();
  await waitFor(() => {
    const inTable = within(screen.getByRole("table"));
    expectCompanyToBeInTable(inTable, company);
  });
});

describe("edit company", () => {
  test("renders view", async () => {
    const company = await renderTable();
    const editCompanyHeader = new RegExp(`edit company ${company.id}`, "i");

    expect(
      screen.queryByRole("heading", { name: editCompanyHeader })
    ).not.toBeInTheDocument();

    server.use(
      rest.get(ApiRoutes.GetCompany(":id"), async (req, res, ctx) => {
        return res(ctx.json(company));
      })
    );

    const editCompanyButton = screen.getByLabelText(/edit company/i);
    await userEvent.click(editCompanyButton);

    await waitForLoadingToFinish();

    expect(
      screen.getByRole("heading", {
        name: editCompanyHeader,
      })
    ).toBeInTheDocument();

    const [type, name, inn, address, ceo, phone, email, contacts] = getInputs();
    expect(type).toHaveValue(company.type);
    expect(name).toHaveValue(company.name);
    expect(inn).toHaveValue(company.inn);
    expect(address).toHaveValue(company.address);
    expect(ceo).toHaveValue(company.ceo);
    expect(phone).toHaveValue(company.phone);
    expect(email).toHaveValue(company.email);
    expect(contacts).toHaveValue(company.contacts);
  });

  test("updates company", async () => {
    const company = await renderTable();

    server.use(
      rest.get(ApiRoutes.GetCompany(":id"), async (req, res, ctx) => {
        return res(ctx.json(company));
      })
    );

    const editCompanyButton = screen.getByLabelText(/edit company/i);
    await userEvent.click(editCompanyButton);

    await waitForLoadingToFinish();

    const inputs = getInputs();
    for (const element of inputs) {
      await userEvent.clear(element);
    }

    const [type, name, inn, address, ceo, phone, email, contacts] = inputs;
    const updatedCompany = buildCompany();
    updatedCompany.id = company.id;
    await userEvent.type(type, updatedCompany.type);
    await userEvent.type(name, updatedCompany.name);
    await userEvent.type(inn, updatedCompany.inn);
    await userEvent.type(address, updatedCompany.address);
    await userEvent.type(ceo, updatedCompany.ceo);
    await userEvent.type(phone, updatedCompany.phone);
    await userEvent.type(email, updatedCompany.email);
    await userEvent.type(contacts, updatedCompany.contacts);

    expect(screen.queryAllByLabelText(/validation error/i)).toHaveLength(0);

    server.resetHandlers(
      rest.get(ApiRoutes.Companies, async (req, res, ctx) => {
        return res(ctx.json([updatedCompany]));
      }),
      rest.put(ApiRoutes.UpdateCompany(":id"), async (req, res, ctx) => {
        return res(ctx.json(null), ctx.status(204));
      })
    );

    const submit = screen.getByRole("button", {
      name: /save changes/i,
    });
    await userEvent.click(submit);
    expect(submit).toBeDisabled();
    await waitForLoadingToFinish();

    await waitFor(() => {
      const inTable = within(screen.getByRole("table"));
      expectCompanyToBeInTable(inTable, updatedCompany);
    });
  });

  test("shows error if loading failed", async () => {
    await renderTable();

    server.use(
      rest.get(ApiRoutes.GetCompany(":id"), async (req, res, ctx) => {
        return res(
          ctx.status(404),
          ctx.json({ status: 404, message: "Company not found" })
        );
      })
    );

    const editCompanyButton = screen.getByLabelText(/edit company/i);
    await userEvent.click(editCompanyButton);

    expect(await screen.findByRole("alert")).toHaveTextContent(
      /failed to load company/i
    );
  });
});

function getInputs() {
  const type = screen.getByRole("textbox", { name: /type/i });
  const name = screen.getByRole("textbox", { name: /name/i });
  const inn = screen.getByRole("textbox", { name: /inn/i });
  const address = screen.getByRole("textbox", { name: /address/i });
  const ceo = screen.getByRole("textbox", { name: /ceo/i });
  const phone = screen.getByRole("textbox", { name: /phone/i });
  const email = screen.getByRole("textbox", { name: /email/i });
  const contacts = screen.getByRole("textbox", { name: /contacts/i });
  return [type, name, inn, address, ceo, phone, email, contacts];
}

function expectCompanyToBeInTable(inTable, company) {
  expect(inTable.getByText(company.id)).toBeInTheDocument();
  expect(inTable.getByText(company.type)).toBeInTheDocument();
  expect(inTable.getByText(company.name)).toBeInTheDocument();
  expect(inTable.getByText(company.inn)).toBeInTheDocument();
  expect(inTable.getByText(company.address)).toBeInTheDocument();
  expect(inTable.getByText(company.ceo)).toBeInTheDocument();
  expect(inTable.getByText(company.phone)).toBeInTheDocument();
  expect(inTable.getByText(company.email)).toBeInTheDocument();
  expect(inTable.getByText(company.contacts)).toBeInTheDocument();
}

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
