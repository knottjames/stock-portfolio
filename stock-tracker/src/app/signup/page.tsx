
'use client'
import CustomForm from '../components/forms/CustomForm';
import styles from './SignUpPage.module.css'
import SignUpHandler from './helper/SignUpHandler';
import { useRouter } from 'next/navigation';
export default function SignUpPage() {
  const router = useRouter();

  const  handleButtonClick = async (email: string, password: string): Promise<string | void> => {
    const message = await SignUpHandler(email, password); 

      if (message === "signed up") {
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
    


  };


  return (

    <div className={styles.container}>
      <CustomForm title="Sign Up" handleSubmit={handleButtonClick} />
    </div>
  );
}

