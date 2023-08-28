'use client'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import styles from './PortfolioPage.module.css';

export default function PortfolioPage() {

    const columns: GridColDef[] = [
        { field: 'ticker', headerName: 'Ticker' ,width: 150},
        { field: 'noShares', headerName: 'No. Shares' ,width: 150},
        { field: 'avgPrice', headerName: 'Avg. Price',width: 150 },
        { field: 'currentPrice', headerName: 'Current Price',width: 150 },
        { field: 'totalValue', headerName: 'Total Value',width: 150},
        { field: 'totalReturn', headerName: 'Total Return',width: 150 },
        { field: 'totalReturnPercent', headerName: 'Total Return %',width: 150 },
    ]

    const rows = [
        { id: 1, ticker: 'Hello', noShares: 2,  avgPrice: 80, currentPrice: 100, totalValue:100,  totalReturn: 40, totalReturnPercent: 25 },
    ]
    // change title to portfolio
    // edit datagrid column headers to use bold font
    return <div className= {styles.container}>
        <h1>Your Portfolio</h1>

        <DataGrid className={styles.grid} columns={columns} rows={rows} autoHeight={true}
 
        />
    </div>
}