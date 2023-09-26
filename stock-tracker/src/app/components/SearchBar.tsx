import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from "@mui/icons-material/Search";
import styles from './SearchBar.module.css';
import { IconButton, createTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import { ThemeProvider } from '@mui/material/styles';
type SearchBarProps = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
const myTheme = createTheme({
  palette: {
    primary: {
      main: "#00c3ff",
    }
  }
});
const SearchBar: FC<SearchBarProps> = ({ value, onChange }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check the initial color scheme
    setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);

    // Add an event listener to update the state when the color scheme changes
    const darkModeListener = (event: MediaQueryListEvent) => {
      setDarkMode(event.matches);
    };

    const matcher = window.matchMedia("(prefers-color-scheme: dark)");
    matcher.addListener(darkModeListener);

    // Clean up the event listener when the component is unmounted
    return () => {
      matcher.removeListener(darkModeListener);
    };
  }, []);

  const router = useRouter();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/search/?query=${value}`);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <ThemeProvider theme={myTheme}>
        <TextField className={styles.textField}
          fullWidth
          label="Search Ticker"
          variant="outlined"
          focused
          value={value}
          onChange={onChange}
          

        />
      
      <IconButton type="submit" aria-label="search">
        <SearchIcon className={styles.searchIcon} />
      </IconButton>
      </ThemeProvider>
    </form>
  );
};

export default SearchBar;
