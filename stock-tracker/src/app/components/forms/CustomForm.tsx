'use client'
import { useState } from "react";
import styles from './CustomForm.module.css';
import Button from '@mui/material/Button';
import FormInput from "./CustomInput";
import Link from "next/link";

interface CustomFormProps {
  title: string;
  handleSubmit: (email: string, password: string) => Promise<string | void>; // Define the prop type for the function you want to pass
}

export default function CustomForm({ title, handleSubmit }: CustomFormProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<boolean>(false);
  const [errorPassword, setErrorPassword] = useState<boolean>(false);
  const [errorMessageEmail, setErrorMessageEmail] = useState<string>(""); 
  const [errorMessagePassword, setErrorMessagePassword] = useState<string>("");
  const handleButtonClick = async () => {
    const errorMessage = await handleSubmit(email, password);
    if (errorMessage) {
      if(errorMessage.toLowerCase().includes("email")){
        setErrorEmail(true);
        setErrorMessageEmail(errorMessage.replace("Firebase: ", ""));
        setErrorPassword(false);
    }else if (errorMessage.toLowerCase().includes("password")){
        setErrorPassword(true);
        setErrorMessagePassword(errorMessage.replace("Firebase: ", ""));
        setErrorEmail(false);
    }

  }
};

  return (
    <div className={styles.container}>
      <header className={styles.title}>{title}</header>
      <FormInput
        className={styles.inputs}
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errorEmail}
        type="text"
      />
      <FormInput
        className={styles.inputs}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errorPassword}
        type="password"
      />


      {errorEmail && <div className={styles.error}>{errorMessageEmail}</div>}
      {errorPassword && <div className={styles.error}>{errorMessagePassword}</div>}

      {title === "Sign Up" ? (
        <>
          <Button className={styles.submit} onClick={handleButtonClick}>Sign Up</Button>
          <br />
          Already have an account?
          <Link className={styles.link} href="/login" >Login here </Link>
        </>
      ) : (
        <>
          <Button className={styles.submit} onClick={handleButtonClick}>Login</Button>
          <br />
          Need an account?
          <Link className={styles.link} href="/signup" >Sign Up here </Link>
        </>
      )}
    </div>
  )
}