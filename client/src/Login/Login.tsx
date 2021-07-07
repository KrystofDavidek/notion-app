import React, { useEffect, useState } from "react";
import "./Login.css";
import { User } from "../models/User";
import { fetcher, postFetcher } from "../utils/fetcher";

export const Login: React.FC<{ userLogin: any }> = ({ userLogin }) => {
  // SI- SIGN IN, SU- SIGN UP
  const [usernameSI, setUsernameSI] = useState("");
  const [passwordSI, setPasswordSI] = useState("");

  const [usernameSU, setUsernameSU] = useState("");
  const [passwordSU, setPasswordSU] = useState("");

  const [signInMessage, setSignInMessage] = useState("");
  const [signedUpMessage, setSignedUpMessage] = useState("");

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    let isMounted = true;
    const fetchUsers = async () => {
      try {
        const users = await fetcher("users");
        return users;
      } catch {
        throw Error("User was not created successfully.");
      }
    };
    fetchUsers().then((users) => {
      if (isMounted) setUsers(users);
    });
    return () => {
      isMounted = false;
    };
  });

  const handleSignInSubmit = () => {
    const user = users.find((usr) => usr.username === usernameSI);
    if (user === undefined) {
      setSignInMessage(`User ${usernameSI} does not exist. Proceed to sign up.`);
      return;
    }
    if (user?.password !== passwordSI) {
      setSignInMessage("Wrong password. Try again.");
      return;
    }
    userLogin(user?.username);
  };

  const handleSignUpSubmit = async () => {
    const user = users.find((usr) => usr.username === usernameSU);
    if (user !== undefined) {
      setSignedUpMessage(`User ${usernameSU} already exists.`);
      return;
    }
    try {
      const response = await postFetcher(`user/${usernameSU}/${passwordSU}`);
      const msg = response.ok
        ? "You have successfully signed up. Proceed to login."
        : "User was not created successfully. Wrong format.";
      setSignedUpMessage(msg);
    } catch {
      throw Error("User was not created successfully.");
    }
  };

  return (
    <div className="login">
      <h1 className="login__title">Welcome to Notion X</h1>
      <div className="login__sign-in sign-in">
        <h1 className="sign-in__title">Sign in</h1>
        <form className="sign-in__form sign-in-form">
          <label>
            <p>Username</p>
            <input className="sign-in-form__input" type="text" onChange={(e) => setUsernameSI(e.target.value)} />
          </label>
          <label>
            <p>Password</p>
            <input className="sign-in-form__input" type="password" onChange={(e) => setPasswordSI(e.target.value)} />
          </label>
          <div>
            <button className="sign-in-form__submit-button" type="button" onClick={handleSignInSubmit}>
              Sign in
            </button>
          </div>
        </form>
        {<span className="login__sign-in-message">{signInMessage}</span>}
      </div>
      <div className="login__sign-up sign-up">
        <span>Don't have an account? </span>
        <h1>Sign up</h1>
        <form className="sign-up__form sign-up-form">
          <label>
            <p>Username</p>
            <input className="sign-up-form__input" type="text" onChange={(e) => setUsernameSU(e.target.value)} />
          </label>
          <label>
            <p>Password</p>
            <input className="sign-up-form__input" type="password" onChange={(e) => setPasswordSU(e.target.value)} />
          </label>
          <div>
            <button className="sign-up-form__submit-button" type="button" onClick={handleSignUpSubmit}>
              Sign up
            </button>
          </div>
        </form>
        {<span className="login__sign-up-message">{signedUpMessage}</span>}
      </div>
    </div>
  );
};
