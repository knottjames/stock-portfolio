'use client'

import Link from "next/link"
import SearchBar from "./SearchBar"
import { ChangeEvent, useEffect, useState } from "react";
import styles from './NavBar.module.css';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import firebaseApp from "../../../lib/firebase";
import Button from "@mui/base/Button";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const [search, setSearch] = useState<string>('');
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const router = useRouter();
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const auth = getAuth(firebaseApp);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  }
  )

  const handleLogOut = () => {
    signOut(auth).then(() => {
      console.log('User signed out');

      router.push("/");
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

      {!signedIn && <Link className={styles.linkSec} href="/signup">
        Login/Sign Up
      </Link>}
      {signedIn && <Button className={styles.linkSec} onClick={handleLogOut}>
        Logout
        </Button>}

    </nav>
  )
}