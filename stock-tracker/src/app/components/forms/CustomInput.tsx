import * as React from 'react';
import Input from '@mui/base/Input';
import { styled } from '@mui/system';

const CustomInput = React.forwardRef(function CustomInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const { className, ...other } = props;
  return <Input slots={{ input: StyledInputElement }} className={className} {...props} ref={ref} />;
});
interface FormInputProps {
  placeholder: string;
  className?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput({placeholder, className, value, onChange}: FormInputProps) {
  return <CustomInput className={className} aria-label="Demo input" placeholder={placeholder} value={value} onChange={onChange} />;
}
const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const StyledInputElement = styled('input')(
  ({ theme }) => `
  width: 320px;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px;
  border-radius: 12px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 24px #00ffbb;

  &:hover {
    border-color: #03ad80;
  }

  &:focus {
    border-color: #00ffbb;
    box-shadow: 0 0 0 3px #00ffbb;
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);