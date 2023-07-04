'use client'
import { useState } from "react";
import styles from './SignUpForm.module.css';
import Button from '@mui/base/Button';
import FormInput from "./CustomInput";
import Link from "next/link";
export default function SignUp() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const handleButtonClick = () => {
    console.log('Email:', email);
    console.log('Password:', password);
  };
  return (
    <div className={styles.container}>
      <header className={styles.title}>Sign Up</header>
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
      <Button className= {styles.submit} onClick={handleButtonClick}>Sign Up</Button>
      <br />
      Already have an account?
      <Link className={styles.link} href="/login" >Login here </Link>
    </div>
  )
}