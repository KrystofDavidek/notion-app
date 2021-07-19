import React, { useState } from "react";
import "./App.css";
import { Container } from "./Container/Container";
import { Login } from "./Login/Login";

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [username, setUsername] = useState("Anonymous");

  const userLogin = (username: string) => {
    setUsername(username);
    setUserLoggedIn(true);
  };

  return <div>{userLoggedIn ? <Container username={username} /> : <Login userLogin={userLogin} />}</div>;
}

export default App;
