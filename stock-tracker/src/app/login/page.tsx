'use client'

import { useRouter } from "next/navigation";
import CustomForm from "../components/forms/CustomForm";
import LoginHandler from "./helper/LoginHandler";
import styles from './LoginPage.module.css';

export default function LoginPage() {
    const router = useRouter();
    const handleButtonClick = (email: string, password: string) => {
        const succcess = LoginHandler(email, password);
        if (!succcess) {
            return;
        }
        router.push("/");
    };
    return (
        <div className= {styles.container}>
            <CustomForm title="Login" handleSubmit={handleButtonClick} />
        </div>
    )
}