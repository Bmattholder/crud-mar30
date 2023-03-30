import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./SignIn.css";

function SignIn() {
  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = signInForm;

  const navigate = useNavigate();

  const onChange = (e) => {
    setSignInForm((p) => ({
      ...p,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <form onSubmit={onSubmit} className="SignIn">
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={onChange}
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={onChange}
        placeholder="Password"
        required
      />
      <button>Sign In</button>
    </form>
  );
}

export default SignIn;
