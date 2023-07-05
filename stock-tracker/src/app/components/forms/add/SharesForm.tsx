import React, { ChangeEvent, useState } from 'react';
import styles from './SharesForm.module.css';
export default function SharesForm ()  {
    const [shares, setShares] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit =() =>{

        // do something with shares and price
        console.log(`Shares: ${shares}, Price: ${price}`);
    };

    const handleSharesChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (/^\d*(\.\d*)?$/.test(e.target.value)) {
            setShares(e.target.value);
        }
    };

    const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (/^\d*(\.\d*)?$/.test(e.target.value)) {
            setPrice(e.target.value);
        }
    };
    return (
        <form className ={styles.container} onSubmit={handleSubmit}>
             <div className={styles.inputDiv}>
                <label className = {styles.label} htmlFor="shares">Number of Shares</label>
                <input  className={styles.input}
                    type="text" 
                    id="shares" 
                    value={shares} 
                    onChange={handleSharesChange} 
                    pattern="\d*(\.\d*)?"
                    required 
                />
            </div>
            <div className={styles.inputDiv}>
                <label className = {styles.label} htmlFor="price">Price Bought At</label>
                <input className={styles.input}
                    type="text" 
                    id="price" 
                    value={price} 
                    onChange={handlePriceChange} 
                    pattern="\d*(\.\d*)?" 
                    required 
                />
            </div>
            <button type="submit" style ={{color: "#00ffbb"}}>Submit</button>
        </form>
    );
};

