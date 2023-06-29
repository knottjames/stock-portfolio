'use client'

import Link from "next/link"
import SearchBar from "./SearchBar"
import { ChangeEvent, useState } from "react";
import styles from './NavBar.module.css';

export default function NavBar(){
    const [search, setSearch] = useState<string>('');
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    };
    return(
        <nav className={styles.nav}>
            <Link className={styles.linkMain} href="/">
              Portfolio Tracker
            </Link>
            
            <SearchBar value={search} onChange={handleSearchChange} />
            <Link className={styles.linkSec} href="/notes">
              Add Stock
            </Link>
            <Link className={styles.linkSec} href="/notes">
              Login
            </Link>
            
          </nav>
    )
}