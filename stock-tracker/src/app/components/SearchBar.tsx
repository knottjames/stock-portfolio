import React, { ChangeEvent, FC } from 'react';
import TextField from '@mui/material/TextField';
import styles from './SearchBar.module.css';
interface SearchBarProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <TextField fullWidth 
      label="Search"
      variant="outlined"
      color ="primary"
      //placeholder="Search"
      focused
      value={value}
      onChange={onChange}
      InputProps={{
        style: { color: 'white' }, // replace #ff0000 with the color you want
      }}
    />
  );
};

export default SearchBar;
