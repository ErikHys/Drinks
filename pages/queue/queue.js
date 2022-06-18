import Link from 'next/link';
import styles from '../../styles/Home.module.css'
import {drink} from "../menus/drink";


export default function Queue({ allData }){
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}>Queue</h1>

                <div className={styles.grid}>
                    {allData.map(drink)}
                </div>
                <h2 className={styles.description}>
                    <Link href="/">
                        <a>Back to orders</a>
                    </Link>
                </h2>
            </main>
        </div>
    );
}