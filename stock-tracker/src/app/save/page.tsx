'use client'
import { useRouter, useSearchParams } from "next/navigation";
import styles from './SaveStockPage.module.css';
import SharesForm from "../components/forms/add/SharesForm";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../../../lib/firebase";

export default function SaveStockPage() {
        const [loggedIn, setLoggedIn] = useState<boolean | undefined>(undefined);
        const searchParams = useSearchParams();
        const [shares, setShares] = useState('');
        const [price, setPrice] = useState('');
        const ticker = searchParams.get('query');
        const router = useRouter();
        const auth = getAuth(firebaseApp);
        const user = auth.currentUser;
        const uid = user?.uid;
        const handleSubmit = async (event: React.FormEvent) => {
                event.preventDefault()
                // do something with shares and price
                console.log(`Shares: ${shares}, Price: ${price}`);

                if (shares !== '' && price !== '' && ticker !== null && uid !== null) {

                        try {
                                const res = await fetch('/api/portfolio', {
                                        method: 'POST',
                                        body: JSON.stringify({ uid, ticker, shares, price }),
                                });
                                if (!res.ok) {
                                        // Handle error
                                        console.error('Error:', res.statusText);
                                } else {
                                        router.push('/');
                                }
                        }
                        catch (error) {
                                console.log(error);
                        }
                }
        };
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
        }, [auth, router, ticker])

        if (loggedIn === undefined) {
                return null;
        }

        if (!loggedIn) {
                // Redirect to login page
                router.push('/login');
                return null;
        }

        return (
                <div className={styles.mainDiv}>
                        <h1 className={styles.header}>Add ${ticker!.toUpperCase()} To Portfolio </h1>

                        <SharesForm price={price} setPrice={setPrice} shares={shares} setShares={setShares} handleSubmit={handleSubmit} />
                </div>
        )

}