import {
  render as rtlRender,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import authService from "../components/api-authorization/AuthorizeService";
import { AppProviders } from "../context/AppProviders";
import { buildUser } from "./generate";

async function render(ui, { route, ...renderOptions } = {}) {
  if (route) {
    window.history.pushState({}, "Test page", route);
  }

  const returnValue = {
    ...rtlRender(ui, { wrapper: AppProviders, ...renderOptions }),
  };

  await waitForLoadingToFinish();

  return returnValue;
}

function login() {
  const user = buildUser();
  jest.spyOn(authService, "getUser").mockReturnValue(user);
  jest.spyOn(authService, "getAccessToken").mockReturnValue("foo");

  return user;
}

const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(() => [
    ...screen.queryAllByLabelText(/loading/i),
    ...screen.queryAllByText(/loading/i),
  ]);

function deferred() {
  let resolve, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

export * from "@testing-library/react";
export { render, userEvent, waitForLoadingToFinish, login, deferred };
