import styles from "../../styles/Home.module.css";
import Link from "next/link";
import {Drink} from "./gin_drinks";


export async function getStaticProps(context) {
    const res = await fetch(process.env.siteUrl + "/api/drinks/groups/drinks")
    const rawData = await res.json()
    const a = rawData.replace('\n', '')
    let jsonData = JSON.parse(a)
    jsonData.ids = jsonData.ids.split(',')
    const allData = (await Promise.all(jsonData.ids.map(async (id) => {
        const res = await fetch(process.env.siteUrl + "/api/drinks/" + id)
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
        return drinkInfo.type.includes('rum');
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

export default function RumDrinks({ allData }) {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}>Rum Arrgh!</h1>

                <div className={styles.grid}>
                    {allData.map(Drink)}
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