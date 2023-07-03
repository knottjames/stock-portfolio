import React, { ChangeEvent, FC, FormEvent } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from "@mui/icons-material/Search";
import styles from './SearchBar.module.css';
import { IconButton } from '@mui/material';
import { useRouter } from 'next/router'; // the import should be from 'next/router' not 'next/navigation'


type SearchBarProps = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar: FC<SearchBarProps> = ({ value, onChange }) => {
 
  const router = useRouter();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/search/?query=${value}`);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <TextField
        fullWidth 
        label="Search"
        variant="outlined"
        focused
        value={value}
        onChange={onChange}
        InputProps={{
          style: { color: 'white' }, // replace #ff0000 with the color you want
        }}
      />
       <IconButton type="submit" aria-label="search">
      <SearchIcon style={{ fill: "#4d94ff" }} />
    </IconButton>
    </form>
  );
};

export default SearchBar;
