import styles from './CustomStats.module.css'

interface CustomStatProps {
    title: string;
    values: string[];
}

export default function CustomStat({ title, values }: CustomStatProps) {
    return (
        <div className={styles.custom_stats_container}>
            <text className= {styles.title}>
                {title}
            </text>
            {values.map((value, index) => (
                <div key={index} className={styles.value}>
                    {value}
                </div>
            ))}

        </div>
    );
}