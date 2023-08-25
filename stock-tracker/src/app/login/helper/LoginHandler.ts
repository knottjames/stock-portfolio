import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../../../../lib/firebase";

export default async function LoginHandler(email: string, password: string): Promise<string> {
    const auth = getAuth(firebaseApp);

    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            return "logged in";

        })
        .catch((error) => {
            const errorMessage = error.message;
            return errorMessage; // Returning the error message
        });

}