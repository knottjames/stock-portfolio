'use client'
import GridLoader from 'react-spinners/GridLoader';
import styles from './LoadingPage.module.css';

export default function Loading() {

    return (
        <div className= {styles.loder_container}>
            <a>
            <GridLoader
                color="#00c3ff"
                margin={5}
            />
            </a>
            
    </div>)
}