import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Login from "../Components/Login";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";

describe("testing the login component", () => {
  test("if no/invalid password  is entered", async () => {
    render(
      <Router>
        <Login changeView={"login"} />
      </Router>
    );

    const blankPassword = "";
    const invalidPassword = "can";
    const userName = "ecombee";

    const submitBtn = screen.getByRole("button");
    const usernameInput = screen.getByTestId("userName-input");
    const passwordInput = screen.getByTestId("password-input");

    fireEvent.change(usernameInput, { target: { value: userName } });
    expect(usernameInput.value).toMatch(userName);

    fireEvent.change(passwordInput, { target: { value: blankPassword } });
    expect(passwordInput.value).toMatch(blankPassword);

    userEvent.click(submitBtn);

    await waitFor(() => {
      const noPassError = screen.getByText(
        "Password must be at least 5 characters"
      );
      expect(noPassError).toBeInTheDocument();
    });

    fireEvent.change(passwordInput, { target: { value: invalidPassword } });
    expect(passwordInput.value).toMatch(invalidPassword);

    userEvent.click(submitBtn);

    await waitFor(() => {
      const noPassError = screen.getByText(
        "Password must be at least 5 characters"
      );
      expect(noPassError).toBeInTheDocument();
    });
  });

  test("if no/invalid username  is entered", async () => {
    render(
      <Router>
        <Login changeView={"login"} />
      </Router>
    );

    const password = "password01";
    const blankUserName = "";
    const longUserName = "thisisabadusername.justfortest";

    const submitBtn = screen.getByRole("button");
    const usernameInput = screen.getByTestId("userName-input");
    const passwordInput = screen.getByTestId("password-input");

    //test if there is no username
    fireEvent.change(usernameInput, { target: { value: blankUserName } });
    expect(usernameInput.value).toMatch(blankUserName);

    //give it a good password to isolate the username input
    fireEvent.change(passwordInput, { target: { value: password } });
    expect(passwordInput.value).toMatch(password);

    userEvent.click(submitBtn);

    await waitFor(() => {
      const noPassError = screen.getByText(
        "Username must be between 4 and 12 characters"
      );
      expect(noPassError).toBeInTheDocument();
    });

    //test for username over 12 characters
    fireEvent.change(usernameInput, { target: { value: longUserName } });
    expect(usernameInput.value).toMatch(longUserName);

    userEvent.click(submitBtn);

    await waitFor(() => {
      const noPassError = screen.getByText(
        "Username must be between 4 and 12 characters"
      );
      expect(noPassError).toBeInTheDocument();
    });
  });

  // test("Click on Sign up Now text to switch to the SignUp component", async () => {
  //   render(
  //     <Router>
  //       <LoginIndex changeView={"login"} />
  //     </Router>
  //   );

  //   const signUpTextLink = screen.getByTestId("signup-text");

  //   userEvent.click(signUpTextLink);

  //   await waitFor(() => {
  //     const noPassError = screen.getByRole("heading", "Sign Up");
  //     expect(noPassError).toBeInTheDocument();
  //   });
  // });
});
