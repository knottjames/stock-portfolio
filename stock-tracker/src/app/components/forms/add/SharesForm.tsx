import React, { ChangeEvent, useState } from 'react';
import styles from './SharesForm.module.css';
import submitStock from '@/app/save/helper/InsertStock';
import { useRouter } from 'next/navigation';

interface SharesFormProps {
    price: string ;
    setPrice: React.Dispatch<React.SetStateAction<string >>;
    shares: string ;
    setShares: React.Dispatch<React.SetStateAction<string >>;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
export default function SharesForm({shares, setShares, price, setPrice, handleSubmit }: SharesFormProps) {
    

    
    const handleSharesChange = (e: ChangeEvent<HTMLInputElement>) => {      
            setShares(e.target.value);
        
    };

    const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    
            setPrice(e.target.value);
        
    };
    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <div className={styles.inputDiv}>
                <label className={styles.label} htmlFor="shares">Number of Shares</label>
                <input className={styles.input}
                    type="number"
                    id="shares"
                    value={shares}
                    onChange={(handleSharesChange)}
                
                    required
                    placeholder="E.g. 23.675"
                />
            </div>
            <div className={styles.inputDiv}>
                <label className={styles.label} htmlFor="price">Price Bought At ($)</label>
                <input className={styles.input}
                    type="number"
                    id="price"
                    value={price}
                    onChange={handlePriceChange}
                    
                    required
                    placeholder="E.g. 100.50"
                />
            </div>
            <button type="submit" style={{ color: "#00c3ff" }}>Submit</button>
        </form>
    );
};

