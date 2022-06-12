import Link from 'next/link';
import styles from '../../styles/Home.module.css'


export default function Queue(){
    return (
    <>
        <h1 className={styles.title}>
            Drinks in queue:
        </h1>
        <h2 className={styles.description}>
            <Link href="/">
                <a>Back to orders</a>
            </Link>
        </h2>
    </>
    );
}