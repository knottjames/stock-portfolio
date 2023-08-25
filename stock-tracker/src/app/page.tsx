'use client'
import { stepLabelClasses } from '@mui/material';
import styles from './HomePage.module.css';

export default function Home() {
  
  return (


      <div className = {styles.container}>
        <h1 className = {styles.header}>Welcome to Stock Tracker!</h1>
        To begin searching stocks, type a ticker symbol into the search bar above. E.g. "AAPL" for Apple.<br></br>
        Currently, the app only supports US stocks and must be searched using their ticker symbol.<br></br>
       
      </div>
      
  
   
  )
}
