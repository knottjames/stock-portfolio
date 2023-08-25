import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../../../../lib/firebase";

export default async function SignUpHandler(email: string, password: string) : Promise<string>{
    const auth = getAuth(firebaseApp);

    return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      return "signed up"; // You can also return true or any other success message you like
    })
    .catch((error) => {
      const errorMessage = error.message;
      return errorMessage; // Returning the error message
    });
}