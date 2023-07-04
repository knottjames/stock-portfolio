import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../../../../lib/firebase";

export default async function SignUpHandler(email: string, password: string) {
    const auth = getAuth(firebaseApp);

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            console.log(user)
            console.log("signed up")
            console.log(user.uid)
            return true;
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            return false;
        });
}