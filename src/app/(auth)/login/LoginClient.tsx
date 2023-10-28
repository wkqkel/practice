"use client";

import { useState } from "react";
import LoginForm from "./LoginForm";

const LoginClient = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
};

export default LoginClient;
