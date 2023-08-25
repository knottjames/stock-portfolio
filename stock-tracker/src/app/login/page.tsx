'use client'

import { useRouter } from "next/navigation";
import CustomForm from "../components/forms/CustomForm";
import LoginHandler from "./helper/LoginHandler";
import styles from './LoginPage.module.css';

export default function LoginPage() {
    const router = useRouter();


    const  handleButtonClick = async (email: string, password: string): Promise<string | void> => {
        const message = await LoginHandler(email, password); 
    
          if (message === "logged in") {
            // Attempt to retrieve the last page from local storage
            const lastPage = localStorage.getItem('lastPage');
    
            if (lastPage) {
              // If a last page exists, navigate there
              router.push(lastPage);
            } else {
              // Otherwise, navigate to the home page
              router.push("/");
            }
          }else{
            return message;
          }
        }
    return (
        <div className= {styles.container}>
            <CustomForm title="Login" handleSubmit={handleButtonClick} />
        </div>
    )
}