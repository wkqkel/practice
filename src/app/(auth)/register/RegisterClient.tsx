"use client";

import RegisterForm from "./RegisterForm";
import styles from "./register.module.scss";

const RegisterClient = () => {
  return (
    <div className={styles.page}>
      <RegisterForm />
    </div>
  );
};

export default RegisterClient;
