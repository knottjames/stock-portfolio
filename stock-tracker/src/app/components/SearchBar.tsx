import React, { ChangeEvent, FC, FormEvent } from 'react';
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
      main: "#00ffbb",
    }
  }
});
const SearchBar: FC<SearchBarProps> = ({ value, onChange }) => {

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
          InputProps={{
            style: { color: 'white' },
          }}

        />
      </ThemeProvider>
      <IconButton type="submit" aria-label="search">
        <SearchIcon className={styles.searchIcon} />
      </IconButton>
    </form>
  );
};

export default SearchBar;
