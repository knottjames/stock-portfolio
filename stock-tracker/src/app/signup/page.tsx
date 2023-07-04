
'use client'
import CustomForm from '../components/forms/CustomForm';
import styles from './SignUpPage.module.css'
import SignUpHandler from './helper/SignUpHandler';
import { useRouter } from 'next/navigation';
export default function SignUpPage (){
  const router = useRouter();

  const handleButtonClick = (email: string, password: string) => {
    const succcess = SignUpHandler(email, password);
    if(!succcess) {
      return;
    }
    router.push("/");
  };


  return (
    
    <div className= {styles.container}>       
        <CustomForm title = "Sign Up" handleSubmit={handleButtonClick}/>
    </div>
  );
}

