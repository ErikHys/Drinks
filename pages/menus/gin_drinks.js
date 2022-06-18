import Image from 'next/image';
import utilStyles from '../../styles/utils.module.css';
import styles from "../../styles/Home.module.css";
import Link from "next/link";


export function Drink(data){
    return (
        <Link href={"/order/" + data.id}>
            <a className={styles.card}>
                <h1>
                    {data.title}
                </h1>
                <div dangerouslySetInnerHTML={{ __html: data.contentHtml}} />
                <Image
                    priority
                    src={data.img}
                    className={utilStyles.borderCircle}
                    height={144}
                    width={144}
                    alt={data.title}
                />
            </a>
        </Link>
    );
}

export function DrinkNoLink(data){
    return (
        <main className={styles.card}>
            <h1>
                {data.title}
            </h1>
            <div dangerouslySetInnerHTML={{ __html: data.contentHtml}} />
            <Image
                priority
                src={data.img}
                className={utilStyles.borderCircle}
                height={144}
                width={144}
                alt={data.title}
            />
        </main>
    );
}



export function DrinkRemove(data){
    return (
        <button className={styles.card} onClick={() => {
            fetch("https://drinks-4mom8m8rz-erikhys.vercel.app/api/queue/" + data.id);
            window.location.reload()
        }}>
            <h1>
                {data.title}
            </h1>
            <div dangerouslySetInnerHTML={{ __html: data.contentHtml}} />
            <Image
                priority
                src={data.img}
                className={utilStyles.borderCircle}
                height={144}
                width={144}
                alt={data.title}
            />
        </button>
    );
}

export async function getServerSideProps(context) {
    const res = await fetch("https://drinks-4mom8m8rz-erikhys.vercel.app/api/drinks/groups/drinks")
    const rawData = await res.json()
    const a = rawData.replace('\n', '')
    let jsonData = JSON.parse(a)
    console.log(a)
    jsonData.ids = jsonData.ids.split(',')
    const allData = (await Promise.all(jsonData.ids.map(async (id) => {
        const res = await fetch("https://drinks-4mom8m8rz-erikhys.vercel.app/api/drinks/" + id)
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
