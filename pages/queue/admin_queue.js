import Link from 'next/link';
import styles from '../../styles/Home.module.css'
import {drinkRemove} from "../menus/drink";


export async function getServerSideProps(context) {
    const res = await fetch("http://localhost:3000/api/queue")
    const rawData = await res.json()
    const a = rawData.replace('\n', '')
    let jsonData = JSON.parse(a)
    jsonData.ids = jsonData.ids.split(',')
    let allData = null
    if (jsonData.ids.length > 0 && jsonData.ids[0] !== '') {
        allData = (await Promise.all(jsonData.ids.map(async (id) => {
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
        })));
    }
    if (!allData) {
        allData = []
        return {
            props: { allData },
        }
    }

    return {
        props: { allData }, // will be passed to the page component as props
    }
}

export default function AdminQueue({ allData }){
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}>Queue</h1>

                <div className={styles.grid}>
                    {allData.map(drinkRemove)}
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