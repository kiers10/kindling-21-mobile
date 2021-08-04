import React from "react";
import LoginScreen from "./loginscreen";
import { render } from "@testing-library/react-native";
import axios from "axios";
jest.mock("axios");

describe("LoginScreen", () => {
  it("Renders LoginScreen without crashing (Unit Test)", () => {
    render(<LoginScreen />);
  });

  it("Mocks Verification Email API call (Integration Test)", async () => {
    axios.post = jest.fn().mockReturnValueOnce({ success_bool: true });
    axios.post(
      "https://kindling-lp.herokuapp.com/api/send_verification_email",
      {
        email: "josephxm825@gmail.com",
      }
    );

    expect(axios.post).toHaveBeenCalledTimes(1);
  });
});