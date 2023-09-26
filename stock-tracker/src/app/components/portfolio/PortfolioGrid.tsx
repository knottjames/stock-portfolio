'use client'
import { getAuth } from "firebase/auth";
import firebaseApp from "../../../../lib/firebase";
import styles from './PortfolioGrid.module.css';
import { DataGrid, GridColDef, GridCellParams } from '@mui/x-data-grid';
import router from "next/router";


const fetchPrices = async (tickerString: string) => {

    const url = new URL('/api/prices', location.origin);
    url.searchParams.append('tickers', tickerString);
    try {
        const res = await fetch(url.toString(), {
            method: 'GET',
        });
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        return await res.json();


    } catch (error) {
        console.error('Failed to fetch current prices:', error);
    }
}
const fetchPortfolio = async () => {
    const auth = getAuth(firebaseApp);
    const user = auth.currentUser;
    const uid = user?.uid;
    await new Promise(resolve => setTimeout(resolve, 1000))
    if (!uid) {
        console.error('User is not authenticated!');
        return;
    }
    const url = new URL('/api/portfolio', location.origin);
    url.searchParams.append('uid', uid); // Append uid as a query parameter
    try {
        const res = await fetch(url.toString(), {
            method: 'GET',
        });
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        return await res.json();


    } catch (error) {
        console.error('Failed to fetch portfolio:', error);
    }

}

export default async function PortfolioGrid() {
    let currentPrices;
    const portfolioData = await fetchPortfolio();
    if (portfolioData && portfolioData.stocks) {
        const tickers = portfolioData.stocks.map((stock: { ticker: string; }) => stock.ticker);
        const tickerString = tickers.join(',');
        console.log("Ticker String:" + tickerString);
        currentPrices = await fetchPrices(tickerString);
    

   
    const columns: GridColDef[] = [
        {
            field: 'ticker', headerName: 'Ticker', width: 150, headerClassName: styles.grid_header,
        },
        { field: 'noShares', headerName: 'Shares', width: 150, headerClassName: styles.grid_header, },
        { field: 'proportion', headerName: '% of Portfolio', width: 150, headerClassName: styles.grid_header, },
        { field: 'avgPrice', headerName: 'Average Price', width: 150, headerClassName: styles.grid_header, },
        { field: 'currentPrice', headerName: 'Current Price', width: 150, headerClassName: styles.grid_header, },
        { field: 'totalInvested', headerName: 'Total Invested', width: 150, headerClassName: styles.grid_header, },
        { field: 'totalValue', headerName: 'Total Value', width: 150, headerClassName: styles.grid_header, },
        {
            field: 'totalReturn', headerName: 'Total Return', width: 150, headerClassName: styles.grid_header,
            cellClassName: (params: GridCellParams) => {
                const value = parseFloat(params.value as string); // assuming value is a string like "10.23%" because of the earlier .toFixed(2) + "%" logic
                if (value > 0) {
                    return styles.positiveReturn;
                } else if (value < 0) {
                    return styles.negativeReturn;
                }
                return '';  // default, no special style
            }
        },
        {
            field: 'totalReturnPercent', headerName: 'Return %', width: 150, headerClassName: styles.grid_header,
            cellClassName: (params: GridCellParams) => {
                const value = parseFloat(params.value as string); // assuming value is a string like "10.23%" because of the earlier .toFixed(2) + "%" logic
                if (value > 0) {
                    return styles.positiveReturn;
                } else if (value < 0) {
                    return styles.negativeReturn;
                }
                return '';  // default, no special style
            }
        },
    ]
    const generateRowId = (() => {
        let currentId = 0;
        return () => currentId++;
    })();
    let totalValueAllStocks = portfolioData.stocks.reduce((sum: number, stock: { shares: number; }) => {
        return sum + stock.shares * 500;  // assuming a constant 500 as current price for all stocks
    }, 0);

    let rows = portfolioData.stocks.map((stock: { ticker: string; shares: number; price: number; }) => ({
        id: generateRowId(),
        ticker: "$" + stock.ticker.toUpperCase(),
        noShares: stock.shares.toFixed(2),
        proportion: (((stock.shares * 500) / totalValueAllStocks) * 100).toFixed(2) + "%",
        avgPrice: "$" + stock.price.toFixed(2),
        currentPrice: "$" + 500.00,
        totalInvested: "$" + (stock.shares * stock.price).toFixed(2),
        totalValue: "$" + (stock.shares * 500).toFixed(2),
        totalReturn: "$" + (stock.shares * 500 - stock.shares * stock.price).toFixed(2),
        totalReturnPercent: (((stock.shares * 500 - stock.shares * stock.price) / (stock.shares * stock.price)) * 100).toFixed(2) + "%",
    }));
    
    return (<DataGrid className={styles.grid} columns={columns} rows={rows} autoHeight={true} />)
}
else{
    return <div> Please Login</div>
}


}