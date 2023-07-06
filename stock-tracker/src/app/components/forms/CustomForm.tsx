'use client'
import { useState } from "react";
import styles from './CustomForm.module.css';
import Button from '@mui/base/Button';
import FormInput from "./CustomInput";
import Link from "next/link";

interface CustomFormProps {
  title: string;
  handleSubmit: (email: string, password: string) => void; // Define the prop type for the function you want to pass
}

export default function CustomForm({ title, handleSubmit }: CustomFormProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleButtonClick = () => {
    handleSubmit(email, password);
  };

  return (
    <div className={styles.container}>
      <header className={styles.title}>{title}</header>
      <FormInput
        className={styles.inputs}
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormInput
        className={styles.inputs}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {title === "Sign Up" ? (
        <>
          <Button className={styles.submit} onClick={handleButtonClick}>Login</Button>
          <br />
          Already have an account?
          <Link className={styles.link} href="/login" >Login here </Link>
        </>
      ) : (
        <>
          <Button className={styles.submit} onClick={handleButtonClick}>Sign Up</Button>
          <br />
          Need an account?
          <Link className={styles.link} href="/signup" >Sign Up here </Link>
        </>
      )}
    </div>
  )
}