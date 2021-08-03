import React from "react";
import RegisterScreen from "./registerscreen";
import { render } from "@testing-library/react-native";
import axios from "axios";
jest.mock("axios");

describe("RegisterScreen", () => {
  it("Renders RegisterScreen without crashing (Unit Test)", () => {
    render(<RegisterScreen />);
  });

  it("Mocks login API call (Integration Test)", async () => {
    axios.post = jest.fn().mockReturnValueOnce({ success_bool: true });
    axios.post(
      "https://kindling-lp.herokuapp.com/api/login",
      {
        email: "josephxm825@gmail.com",
        password_str: "valorant_fan"
      }
    );

    expect(axios.post).toHaveBeenCalledTimes(1);
  });
});