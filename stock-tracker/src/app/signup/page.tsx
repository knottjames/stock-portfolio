

import { useState, useEffect } from 'react';
import firebaseApp from '../../../lib/firebase';
import SignUp from '../components/forms/SignUpForm';
import styles from './SignUpPage.module.css'
export default function LoginPage (){




  return (
    
    <div className= {styles.container}>
        
        <SignUp />
    </div>
  );
}

