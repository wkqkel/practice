"use client";

import LoginForm from "./LoginForm";
import styles from "./Login.module.scss";

const LoginClient = () => {
  return (
    <div className={styles.page}>
      <LoginForm />
    </div>
  );
};

export default LoginClient;
