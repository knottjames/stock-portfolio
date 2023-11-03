'use client'

import Link from "next/link"
import SearchBar from "./SearchBar"
import { ChangeEvent, useEffect, useState } from "react";
import styles from './NavBar.module.css';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import firebaseApp from "../../../lib/firebase";

import { useRouter } from "next/navigation";

export default function NavBar() {
  const [search, setSearch] = useState<string>('');
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const saveLastPage = () => {
    localStorage.setItem('lastPage', window.location.href);
  }

  const auth = getAuth(firebaseApp);
  useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  }
  )
}, [auth])

  const handleLogOut = () => {
    signOut(auth).then(() => {
      console.log('User signed out');

    }).catch((error) => {
      // An error occurred
      console.log(error);
    });

  }

  return (
    <nav className={styles.nav}>
      <Link className={styles.linkMain} href="/">
        Portfolio Tracker
      </Link>

      <SearchBar value={search} onChange={handleSearchChange} />
      <div className={styles.secDiv}>
      <Link className={styles.linkSec} onClick ={saveLastPage} href="/portfolio">
        Portfolio
      </Link>
      {!signedIn && <Link className={styles.linkSec} onClick ={saveLastPage} href="/signup">
        Login/Sign Up
      </Link>}
      {signedIn && <Link className={styles.linkSec} onClick={handleLogOut} href = "/">
        Logout
        </Link>}
      </div>
      

    </nav>
  )
}