import styles from "../../styles/Home.module.css";
import Link from "next/link";

export default function WhiskyDrinks() {
    return (
        <>
            <h1 className={styles.title}>Whisky drinks...</h1>
            <h2 className={styles.description}>
                <Link href="/">
                    <a>Back to orders</a>
                </Link>
            </h2>
        </>
    );
}