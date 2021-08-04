import React from "react";
import VerifyScreen from "./verifyscreen";
import { render } from "@testing-library/react-native";
import axios from "axios";
jest.mock("axios");

describe("RegisterScreen", () => {
  it("Renders VerifyScreen without crashing (Unit Test)", () => {
    render(<VerifyScreen />);
  });

  it("Mocks register API call (Integration Test)", async () => {
    axios.post = jest.fn().mockReturnValueOnce({ success_bool: true });
    axios.post(
      "https://kindling-lp.herokuapp.com/api/register",
      {
        email: "josephxm825@gmail.com",
        password_str: "valorant_fan",
        display_name_str: "123-456-7890",
        is_group_bool: true
      }
    );

    expect(axios.post).toHaveBeenCalledTimes(1);
  });
});