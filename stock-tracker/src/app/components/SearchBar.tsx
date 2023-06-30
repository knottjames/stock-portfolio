import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from "@mui/icons-material/Search";
import styles from './SearchBar.module.css';
import { IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';


const SearchBar: FC = () => {
  const [value, setValue] = useState(''); // Add local state for 'value'
 
  const router = useRouter();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/search/?query=${value}`);
    setValue(''); // Reset the search bar value after form submission
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value); // Update 'value' when the user types into the search bar
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <TextField
        fullWidth 
        label="Search"
        variant="outlined"
        focused
        value={value}
        onChange={handleChange}
        InputProps={{
          style: { color: 'white' }, // replace #ff0000 with the color you want
        }}
      />
      {/* <Button className={styles.button} variant="outlined" color="primary" type="submit">
        Submit
      </Button> */}
       <IconButton type="submit" aria-label="search">
      <SearchIcon style={{ fill: "#4d94ff" }} />
    </IconButton>
    </form>
  );
};

export default SearchBar;
