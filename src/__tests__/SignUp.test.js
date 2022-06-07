import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import SignUp from "../Components/SignUp";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("testing sign up component", () => {
  test("submitting with a empty and invalid username", async () => {
    render(
      <Router>
        <SignUp changeView={"signup"} />
      </Router>
    );

    const password = "password";
    const blankUserName = "";
    const badUserName = "can";

    const submitBtn = screen.getByRole("button");
    const usernameInput = screen.getByTestId("userName-input");
    const passwordInput = screen.getByTestId("password-input");

    fireEvent.change(usernameInput, { target: { value: blankUserName } });
    expect(usernameInput.value).toMatch(blankUserName);

    //entered in a password to isolate the username input
    fireEvent.change(passwordInput, { target: { value: password } });
    expect(passwordInput.value).toMatch(password);

    userEvent.click(submitBtn);

    await waitFor(() => {
      const noPassError = screen.getByText(
        "Username must be between 4 and 12 characters long"
      );
      expect(noPassError).toBeInTheDocument();
    });

    fireEvent.change(usernameInput, { target: { value: badUserName } });
    expect(usernameInput.value).toMatch(badUserName);

    userEvent.click(submitBtn);

    await waitFor(() => {
      const noPassError = screen.getByText(
        "Username must be between 4 and 12 characters long"
      );
      expect(noPassError).toBeInTheDocument();
    });
  });

  test("submitting a empty, non-matching, and invalid password", async () => {
    render(
      <Router>
        <SignUp changeView={"signup"} />
      </Router>
    );

    const userName = "ecombee";
    const blankPass = "";
    const badPass = "can";
    const goodPass = "password";
    const nonMatchingPass = "password01";

    const submitBtn = screen.getByRole("button");
    const usernameInput = screen.getByTestId("userName-input");
    const passwordInput = screen.getByTestId("password-input");
    const confirmPassInput = screen.getByTestId("confirm-password-input");

    //entered in a username to isolate the password input
    fireEvent.change(usernameInput, { target: { value: userName } });
    expect(usernameInput.value).toMatch(userName);

    //enter in a blank password
    fireEvent.change(passwordInput, { target: { value: blankPass } });
    expect(passwordInput.value).toMatch(blankPass);

    userEvent.click(submitBtn);

    await waitFor(() => {
      const noPassError = screen.getByText(
        "Password must be at least 5 characters"
      );
      expect(noPassError).toBeInTheDocument();
    });

    //enter in a invalid password
    fireEvent.change(passwordInput, { target: { value: badPass } });
    expect(passwordInput.value).toMatch(badPass);

    userEvent.click(submitBtn);

    await waitFor(() => {
      const noPassError = screen.getByText(
        "Password must be at least 5 characters"
      );
      expect(noPassError).toBeInTheDocument();
    });

    //Passwords entered dont match
    fireEvent.change(passwordInput, { target: { value: goodPass } });
    expect(passwordInput.value).toMatch(goodPass);

    fireEvent.change(confirmPassInput, {
      target: { value: nonMatchingPass },
    });
    expect(confirmPassInput.value).toMatch(nonMatchingPass);

    userEvent.click(submitBtn);

    await waitFor(() => {
      const noPassError = screen.getByText("Passwords do not match");
      expect(noPassError).toBeInTheDocument();
    });
  });

  // test("Click on Sign in text to switch to the sign in component", async () => {
  //   render(
  //     <Router>
  //       <SignUp changeView={"signup"} />
  //     </Router>
  //   );

  //   const signInTextLink = screen.getByTestId("signin-text");

  //   userEvent.click(signInTextLink);

  //   await waitFor(() => {
  //     const heading = screen.getByRole("heading", "Sign In");
  //     expect(heading).toBeInTheDocument();
  //   });
  // });
});
