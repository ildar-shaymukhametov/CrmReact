import "@testing-library/jest-dom/extend-expect";
import { configure, act } from "@testing-library/react";
import { server } from "./test/server";

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock the request issued by the react app to get the client configuration parameters.
// window.fetch = () => {
//   return Promise.resolve({
//     ok: true,
//     json: () =>
//       Promise.resolve({
//         authority: "https://localhost:7119",
//         client_id: "CRM.App",
//         redirect_uri: "https://localhost:7119/authentication/login-callback",
//         post_logout_redirect_uri:
//           "https://localhost:7119/authentication/logout-callback",
//         response_type: "id_token token",
//         scope: "CRM.AppAPI openid profile",
//       }),
//   });
// };

// speeds up *ByRole queries a bit
// https://github.com/testing-library/dom-testing-library/issues/552
configure({ defaultHidden: true });

// enable API mocking in test runs using the same request handlers
// as for the client-side mocking.
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => {
  server.resetHandlers();
});

// real times is a good default to start, individual tests can
// enable fake timers if they need, and if they have, then we should
// run all the pending timers (in `act` because this can trigger state updates)
// then we'll switch back to realTimers.
// it's important this comes last here because jest runs afterEach callbacks
// in reverse order and we want this to be run first so we get back to real timers
// before any other cleanup
afterEach(async () => {
  if (jest.isMockFunction(setTimeout)) {
    act(() => jest.runOnlyPendingTimers());
    jest.useRealTimers();
  }
});
