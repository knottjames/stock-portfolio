
import { Suspense } from 'react';
import PortfolioGrid from '../components/portfolio/PortfolioGrid';
import styles from './PortfolioPage.module.css';
import Loading from './loading';


export default function PortfolioPage() {

    return <div className={styles.container}>
        <h1 className={styles.header}>Your Portfolio</h1>
        <Suspense fallback={<Loading />}>
            <PortfolioGrid />
        </Suspense>

    </div>
}

