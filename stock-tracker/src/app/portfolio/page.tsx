'use client'
import { DataGrid, GridColDef, GridValueGetterParams, GridRenderCellParams, GridCellParams } from '@mui/x-data-grid';
import styles from './PortfolioPage.module.css';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { getAuth } from 'firebase/auth';
import firebaseApp from '../../../lib/firebase';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import clsx from 'clsx';
export default function PortfolioPage() {
    const [loading, setLoading] = useState(true);
    const [portfolioData, setPortfolioData] = useState<any>(null);
    const auth = getAuth(firebaseApp);
    const user = auth.currentUser;
    const uid = user?.uid;
    const fetchPortfolio = async () => {
        if (!uid) {
            console.error('User is not authenticated!');
            // You may want to handle this situation differently.
            setLoading(false);
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
            const data = await res.json();
            console.log("Successful response:", data);  // Log successful response
            setPortfolioData(data);
    
        } catch (error) {
            console.error('Failed to fetch portfolio:', error);
        } finally {
            console.log("End of fetchPortfolio function."); // Log end
            setLoading(false);
            console.log(loading)
            console.log(portfolioData)
        }
    };



    useEffect(() => {
        fetchPortfolio();

    }, []);


    // change title to portfolio
    // edit datagrid column headers to use bold font

    if (loading) {
        return <div className={styles.loader_container}>
            <div className={styles.spinner}></div>
        </div>
    }

    if (!portfolioData || Object.keys(portfolioData).length === 0) {
        return <div>No available portfolio</div>
    } else {

        const columns: GridColDef[] = [
            {
                field: 'ticker', headerName: 'Ticker', width: 200, headerClassName: styles.grid_header,
            },
            { field: 'noShares', headerName: 'Shares', width: 200, headerClassName: styles.grid_header, },
            { field: 'avgPrice', headerName: 'Average Price ($)', width: 200, headerClassName: styles.grid_header, },
            { field: 'currentPrice', headerName: 'Current Price ($)', width: 200, headerClassName: styles.grid_header, },
            { field: 'totalInvested', headerName: 'Total Invested ($)', width: 200, headerClassName: styles.grid_header, },
            { field: 'totalValue', headerName: 'Total Value ($)', width: 200, headerClassName: styles.grid_header, },
            { field: 'totalReturn', headerName: 'Total Return ($)', width: 200, headerClassName: styles.grid_header, 
            cellClassName: (params: GridCellParams) => {
                const value = parseFloat(params.value as string); // assuming value is a string like "10.23%" because of the earlier .toFixed(2) + "%" logic
                if (value > 0) {
                    return styles.positiveReturn;
                } else if (value < 0) {
                    return styles.negativeReturn;
                }
                return '';  // default, no special style
            }},
            {
                field: 'totalReturnPercent', headerName: 'Percentage Return %', width: 200, headerClassName: styles.grid_header,
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

        let rows = portfolioData.stocks.map((stock: { ticker: string; shares: number; price: number; }) => ({
            id: generateRowId(),
            ticker: "$" + stock.ticker.toUpperCase(),
            noShares: stock.shares,
            avgPrice: stock.price,
            currentPrice: 500,
            totalInvested: stock.shares * stock.price,
            totalValue: stock.shares * 500,
            totalReturn: stock.shares * 500 - stock.shares * stock.price,
            totalReturnPercent: (((stock.shares * 500 - stock.shares * stock.price) / (stock.shares * stock.price)) * 100).toFixed(2) + "%",
        }));


        return <div className={styles.container}>
            <h1 className={styles.header}>Your Portfolio</h1>

            <DataGrid className={styles.grid} columns={columns} rows={rows} autoHeight={true}

            />
        </div>
    }
}