'use client'
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from './SearchPage.module.css';
import StatsBox from "../components/stats/StatsBox";
import { title } from "process";
export default function SearchPage() {

    const searchParams = useSearchParams();
    const ticker = searchParams.get('query');
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [showFullSummary, setShowFullSummary] = useState(false);

    const handleShowMoreClick = () => {
        setShowFullSummary(!showFullSummary);
    };
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

    if (!data || Object.keys(data).length === 0) {
        return <div>No data available for ${ticker}</div>
    }

    else {

        const changeClass = data.price.regularMarketChangePercent.raw > 0 ? styles.green : styles.red;
        let titles1: string [] = [`Overview`, `Cash Flow`, `Balance Sheet`]
        let titles2: string[] = [`Margins`, `Growth`, `Dividends`]

        let overview: string[] = [`P/E Ratio ${data.summaryDetail.trailingPE.fmt}`, `Forward P/E ${data.summaryDetail.forwardPE.fmt}`, `Market Cap $${data.summaryDetail.marketCap.fmt}`, `Price to Sales ${data.summaryDetail.priceToSalesTrailing12Months.fmt}`, `Price to Book ${data.defaultKeyStatistics.priceToBook.fmt}`, `EPS $${data.defaultKeyStatistics.trailingEps.fmt}`]
        let cashflow: string[] = [`Free Cash Flow $${data.financialData.freeCashflow.fmt}`, `Operating Cash Flow $${data.financialData.operatingCashflow.fmt}` ]
        let balancesheet: string[] = [`Total Cash $${data.financialData.totalCash.fmt}`, `Total Debt $${data.financialData.totalDebt.fmt}`, `Debt/Equity ${data.financialData.debtToEquity.fmt}`]
        let margins : string[] =[ `Gross Profit Margin ${data.financialData.grossMargins.fmt}`, `Operating Margin ${data.financialData.operatingMargins.fmt}`, `Profit Margin ${data.financialData.profitMargins.fmt}`	]
        let growth: string [] = [`Revenue Growth ${data.financialData.revenueGrowth.fmt}`, `EPS Growth ${data.financialData.earningsGrowth.fmt}` , `Quarterly Earnings Growth ${data.defaultKeyStatistics.earningsQuarterlyGrowth.fmt}`, `PEG Ratio ${data.defaultKeyStatistics.pegRatio.fmt}`]
        let divbox: string[] = [`Div. Yield ${data.summaryDetail.dividendYield.fmt}`, `Ex. Dividend Date ${data.summaryDetail.exDividendDate.fmt}`, `Dividend Rate ${data.summaryDetail.dividendRate.fmt}`, `Payout Ratio ${data.summaryDetail.payoutRatio.fmt}`]
        let values1: string[][] = [overview, cashflow, balancesheet]
        let values2: string[][] = [margins, growth, divbox]
        return <div>
            <div className={styles.headerDiv}>
                <header className={styles.header}>

                    <h1 className={styles.h1}>{data.quoteType.longName} (${data.quoteType.symbol}) <br />
                        ${data.price.regularMarketPrice.raw} USD <span className={changeClass}>{(data.price.regularMarketChangePercent.raw * 100).toFixed(2)}% </span><br />

                    </h1>

                    <h2 className={styles.h2}>
                        <div className={styles.summaryHeader}>
                            Summary
                        </div>
                        <div className={styles.summaryDiv}>
                            {showFullSummary ? data.summaryProfile.longBusinessSummary : data.summaryProfile.longBusinessSummary.substring(0, 200)}
                        </div>

                    </h2>
                    <button style={{ color: "#00ffbb" }} onClick={handleShowMoreClick}>{showFullSummary ? "Show Less" : "Show More"}</button>
                </header>






            </div>
            <StatsBox titles = {titles1} values = {values1}  />
            <StatsBox titles = {titles2} values  = {values2} />
        </div>

    }
}