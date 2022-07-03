import React from "react";
import { App } from "../App";
import { login, render } from "../test/utils";

it("renders without crashing", async () => {
  login();
  await render(<App />);
  await new Promise(resolve => setTimeout(resolve, 1000));
});
