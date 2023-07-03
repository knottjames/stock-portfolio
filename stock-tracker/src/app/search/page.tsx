'use client'
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from './SearchPage.module.css';
export default function SearchPage() {

    const searchParams = useSearchParams();
    const ticker = searchParams.get('query');
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch(`/api/stocks?query=${ticker}`);
                const json = await response.json();
                console.log(json);
                setData(json);
                setLoading(false);
            } catch (err) {
                console.error("An error occurred during fetch:", err); // Log any errors
            }
        };

        console.log("Fetching data...");
        fetchData();

    }, [ticker]); // The empty array [] means this useEffect will run once when the component mounts.  
    if (loading) {
        return <div className={styles.loader_container}>
            <div className={styles.spinner}></div>
        </div>
    }
    const changeClass = data.price.regularMarketChangePercent.raw > 0 ? styles.green : styles.red;

    if (!data || Object.keys(data).length === 0) {
        return <div>No data available for {ticker}</div>
    }

    return <div className="container mx-auto">
        <header className={styles.header}>
           
                <h1 className= {styles.h1}>{data.quoteType.longName} ({data.quoteType.symbol}) <br/>
                Current Price: ${data.price.regularMarketPrice.raw} Previous Close: ${data.price.regularMarketPreviousClose.raw} <span className={changeClass}>{(data.price.regularMarketChangePercent.raw * 100).toFixed(2)}% </span><br/>
                P.E. = <br/>
                Div. Yield {data.summaryDetail.dividendYield.fmt}<br/>
                Market Cap {data.summaryDetail.marketCap.fmt}</h1>
            
            <h2 className={styles.h2}>Summary  <br/>{data.summaryProfile.longBusinessSummary}</h2>
        </header>

    </div>
}