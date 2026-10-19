"use client";

import { useState } from "react";
import type { ChangeEvent } from "react";
import { useAppSelector } from "@/store/hooks";
import styles from "./LoginView.module.css";

export function LoginView() {
  const copy = useAppSelector((state) => state.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);

  const handleSubmitClick = () => {
    setErrorVisible(true);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <main className={styles.page}>
      <div className={styles.group}>
        <h1 className={styles.title}>{copy.appName}</h1>
        <p className={styles.description}>{copy.appDescription}</p>
        <section className={styles.card}>
          <h2 className={styles.heading}>{copy.heading}</h2>
          <label className={styles.label} htmlFor="WELG0010-email">
            {copy.emailLabel}
          </label>
          <input
            id="WELG0010-email"
            className={styles.input}
            type="text"
            value={email}
            placeholder={copy.emailPlaceholder}
            onChange={handleEmailChange}
          />
          <label className={`${styles.label} ${styles.passwordLabel}`} htmlFor="WELG0010-password">
            {copy.passwordLabel}
          </label>
          <input
            id="WELG0010-password"
            className={styles.input}
            type="password"
            value={password}
            placeholder={copy.passwordPlaceholder}
            onChange={handlePasswordChange}
          />
          <div className={styles.errorSlot}>{errorVisible ? copy.errorMessage : null}</div>
          <button className={styles.submit} type="button" onClick={handleSubmitClick}>
            {copy.submitLabel}
          </button>
        </section>
        <p className={styles.note}>{copy.note}</p>
      </div>
    </main>
  );
}
