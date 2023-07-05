'use client'
import { useRouter, useSearchParams } from "next/navigation";
import styles from './SaveStockPage.module.css';
import SharesForm from "../components/forms/add/SharesForm";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../../../lib/firebase";

export default function SaveStockPage() {
        const [loggedIn, setLoggedIn] = useState<boolean| undefined>(undefined);
        const searchParams = useSearchParams();
        const ticker = searchParams.get('query');
        const router = useRouter();
        const auth = getAuth(firebaseApp);
        useEffect(() => {
                onAuthStateChanged(auth, (user) => {
                        if (user) {
                                setLoggedIn(true);
                        } else {
                                localStorage.setItem('lastPage', '/save?query=' + ticker);
                                router.push('/login');
                                setLoggedIn(false);
                        }
                }
                )
        }, [])

        if(loggedIn === undefined) {
                return null;
        }

        if (!loggedIn) {
                // Redirect to login page
                router.push('/login');
                return null;
        }
                
        return (
                <div className={styles.mainDiv}>
                        <h1>Save Stock ${ticker!.toUpperCase()}</h1>

                        <SharesForm />
                </div>
        )

}