"use client";

import { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { Button } from "@/components/button/Button";
import { Card } from "@/components/card/Card";
import { FieldLabel } from "@/components/field/FieldLabel";
import { TextInput } from "@/components/field/TextInput";
import { PageTitle } from "@/components/page-title/PageTitle";
import styles from "./LoginView.module.css";

export function LoginView() {
  const copy = useAppSelector((state) => state.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);

  return (
    <main className={styles.page}>
      <div className={styles.group}>
        <PageTitle
          title={copy.appName}
          description={copy.appDescription}
          titleClassName={styles.title}
          descriptionClassName={styles.description}
        />
        <Card className={styles.card}>
          <h2 className={styles.heading}>{copy.heading}</h2>
          <FieldLabel htmlFor="WELG0010-email">{copy.emailLabel}</FieldLabel>
          <TextInput
            id="WELG0010-email"
            className={styles.input}
            value={email}
            placeholder={copy.emailPlaceholder}
            onChange={setEmail}
          />
          <FieldLabel className={styles.passwordLabel} htmlFor="WELG0010-password">
            {copy.passwordLabel}
          </FieldLabel>
          <TextInput
            id="WELG0010-password"
            className={styles.input}
            type="password"
            value={password}
            placeholder={copy.passwordPlaceholder}
            onChange={setPassword}
          />
          <div className={styles.errorSlot}>{errorVisible ? copy.errorMessage : null}</div>
          <Button variant="primary" className={styles.submit} onClick={() => setErrorVisible(true)}>
            {copy.submitLabel}
          </Button>
        </Card>
        <p className={styles.note}>{copy.note}</p>
      </div>
    </main>
  );
}
