
import { stepLabelClasses } from '@mui/material';
import styles from './HomePage.module.css';
import HomeHeroComponent from './components/home-hero-component';

export default function Home() {
  
  return (


      <div className = {styles.container}>
       
        <HomeHeroComponent></HomeHeroComponent>
      </div>
      
  
   
  )
}
