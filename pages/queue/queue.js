import Link from 'next/link';
import styles from '../../styles/Home.module.css'
import {DrinkNoLink} from "../menus/gin_drinks";


export async function getServerSideProps(context) {
    const res = await fetch("https://drinks-tau.vercel.app/api/queue")
    const rawData = await res.json()
    const a = rawData.replace('\n', '')

    console.log(a)
    console.log(a[69])
    let jsonData = JSON.parse(a)
    jsonData.ids = jsonData.ids.split(',')
    const allData = (await Promise.all(jsonData.ids.map(async (id) => {
        const res = await fetch("https://drinks-tau.vercel.app/api/drinks/" + id)
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
    })));

    if (!allData) {
        return {
            notFound: true,
        }
    }

    return {
        props: { allData }, // will be passed to the page component as props
    }
}

export default function Queue({ allData }){
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}>Queue</h1>

                <div className={styles.grid}>
                    {allData.map(DrinkNoLink)}
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