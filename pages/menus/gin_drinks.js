import styles from "../../styles/Home.module.css";
import Link from "next/link";
import {drink} from "./drink";


export async function getServerSideProps(context) {
    const res = await fetch("http://localhost:3000/api/drinks/groups/drinks")
    const rawData = await res.json()
    const a = rawData.replace('\n', '')
    let jsonData = JSON.parse(a)
    jsonData.ids = jsonData.ids.split(',')
    const allData = (await Promise.all(jsonData.ids.map(async (id) => {
        const res = await fetch("http://localhost:3000/api/drinks/" + id)
        const rawData = await res.json()
        const a = rawData.replace('\n', '')
        let tempData = {"id": id}
        try {
            tempData = JSON.parse(a)
        } catch (e) {
            console.error(e)
            console.error("id:" + id)
        }
        const data = tempData
        return data;
    }))).filter((drinkInfo) => {
        return drinkInfo.type.includes('gin');
    });

    if (!allData) {
        return {
            notFound: true,
        }
    }

    return {
        props: { allData }, // will be passed to the page component as props
    }
}

export default function GinDrinks({ allData }) {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}>Gin drinks</h1>

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
