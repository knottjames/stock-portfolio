
import styles from './StatsBox.module.css'
import CustomStat from './custom/CustomStats'

interface StatsBoxProps {
    titles: string[];
    values: string[][];
}

export default function StatsBox ({titles, values}: StatsBoxProps) {{
    return (
        <div className={styles.stats}>
        <CustomStat title = {titles[0]} values ={values[0]} />
        <CustomStat title = {titles[1]} values ={values[1]} />
        <CustomStat title = {titles[2]} values ={values[2]} />
    </div >
    )
}}